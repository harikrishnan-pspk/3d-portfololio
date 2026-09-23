import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralSynapses } from './NeuralSynapses';

interface ProceduralBrainProps {
  isMobile?: boolean;
}

// Generate anatomical brain hemisphere geometry
function createHemisphereGeometry(isRight: boolean, segmentsU = 56, segmentsV = 42) {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const xSign = isRight ? 1 : -1;

  for (let j = 0; j <= segmentsV; j++) {
    const v = j / segmentsV;
    const theta = v * Math.PI; // 0 (top) to PI (bottom)

    for (let i = 0; i <= segmentsU; i++) {
      const u = i / segmentsU;
      const phi = u * Math.PI;

      // Base anatomical ellipsoid radii — larger than before
      const rx = 0.95;
      const ry = 0.90;
      const rz = 1.38;

      let x = Math.sin(theta) * Math.sin(phi) * rx;
      let y = Math.cos(theta) * ry;
      let z = Math.sin(theta) * Math.cos(phi) * rz;

      // 1. Taper frontal pole (anterior)
      if (z > 0.2) {
        const frontalTaper = 1 - 0.24 * (z / rz);
        x *= frontalTaper;
        y *= 0.93;
      }

      // 2. Expand parietal/occipital dome (posterior)
      if (z < -0.1) {
        const parietalBulge = 1 + 0.16 * Math.abs(z / rz);
        x *= parietalBulge;
      }

      // 3. Temporal lobe lateral bulge
      const temporalDist = Math.hypot((z - 0.15) / 0.5, (y + 0.35) / 0.35);
      if (temporalDist < 1.2) {
        const tempBulge = (1 - temporalDist / 1.2) * 0.30;
        x += tempBulge * 0.9;
        y -= tempBulge * 0.4;
      }

      // 4. Flatten medial wall along sagittal fissure
      const fissureGap = 0.10;
      const isMedial = Math.cos(phi) < -0.85 || u < 0.08;
      if (isMedial) {
        x = Math.min(x, 0.15);
      }

      // 5. Gyri & Sulci folds — more pronounced convolutions
      const gyriFreq1 = 8.5;
      const gyriFreq2 = 13.0;
      const gyriFreq3 = 19.0;
      const gyriFreq4 = 6.0;

      const gyriFold =
        0.095 * Math.sin(x * gyriFreq1 + z * gyriFreq2) * Math.cos(y * gyriFreq1) +
        0.055 * Math.sin(y * gyriFreq2 + z * gyriFreq3) +
        0.030 * Math.cos(x * gyriFreq3 + y * gyriFreq1) +
        0.020 * Math.sin(z * gyriFreq4 + x * gyriFreq2);

      const foldScale = 1.0 + gyriFold;
      x *= foldScale;
      y *= foldScale;
      z *= foldScale;

      x = xSign * (x + fissureGap);

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  // Generate face indices
  for (let j = 0; j < segmentsV; j++) {
    for (let i = 0; i < segmentsU; i++) {
      const a = j * (segmentsU + 1) + i;
      const b = (j + 1) * (segmentsU + 1) + i;
      const c = (j + 1) * (segmentsU + 1) + (i + 1);
      const d = j * (segmentsU + 1) + (i + 1);

      if (isRight) {
        indices.push(a, b, d);
        indices.push(b, c, d);
      } else {
        indices.push(a, d, b);
        indices.push(b, d, c);
      }
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

// Generate cerebellum geometry (posterior base)
function createCerebellumGeometry(isRight: boolean) {
  const geo = new THREE.SphereGeometry(0.44, 28, 22);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const xSign = isRight ? 1 : -1;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    x *= 1.18;
    y *= 0.62;
    z *= 0.88;

    // Foliated striations
    const striation = 0.035 * Math.sin(y * 38.0);
    x += striation;
    z += striation;

    x = xSign * (Math.abs(x) + 0.28);
    y -= 0.70;
    z -= 0.85;

    pos.setXYZ(i, x, y, z);
  }

  geo.computeVertexNormals();
  return geo;
}

// Generate brain stem
function createBrainStemGeometry() {
  const geo = new THREE.CylinderGeometry(0.14, 0.18, 0.55, 16);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // slight curve forward
    const curveZ = 0.12 * (y + 0.275) / 0.55;
    pos.setXYZ(i, x, y, z + curveZ);
  }

  geo.computeVertexNormals();
  return geo;
}

// Build glowing neural pathway lines on the cortical surface
function buildSurfacePathways(
  leftGeo: THREE.BufferGeometry,
  rightGeo: THREE.BufferGeometry,
  count: number
) {
  const linePositions: number[] = [];
  const lineColors: number[] = [];

  const leftPos = leftGeo.attributes.position.array as Float32Array;
  const rightPos = rightGeo.attributes.position.array as Float32Array;
  const totalLeft = leftPos.length / 3;
  const totalRight = rightPos.length / 3;

  const cyanColor = new THREE.Color('#00f0ff');
  const blueColor = new THREE.Color('#38bdf8');
  const purpleColor = new THREE.Color('#a855f7');

  const allVerts: THREE.Vector3[] = [];
  const step = Math.max(1, Math.floor(totalLeft / (count * 2)));

  for (let i = 0; i < totalLeft; i += step) {
    allVerts.push(new THREE.Vector3(leftPos[i * 3], leftPos[i * 3 + 1], leftPos[i * 3 + 2]));
  }
  for (let i = 0; i < totalRight; i += step) {
    allVerts.push(new THREE.Vector3(rightPos[i * 3], rightPos[i * 3 + 1], rightPos[i * 3 + 2]));
  }

  const maxDist = 0.45;
  const pathwayCount = Math.min(count, 120);

  for (let i = 0; i < pathwayCount && i < allVerts.length; i++) {
    const fromIdx = Math.floor(Math.random() * allVerts.length);
    const from = allVerts[fromIdx];
    // Find nearby vertex
    let closestDist = Infinity;
    let closestIdx = -1;
    const searchRange = Math.min(allVerts.length, 80);
    for (let k = 0; k < searchRange; k++) {
      const j = Math.floor(Math.random() * allVerts.length);
      if (j === fromIdx) continue;
      const d = from.distanceTo(allVerts[j]);
      if (d > 0.08 && d < maxDist && d < closestDist) {
        // Prefer same-side connections
        if ((from.x > 0 && allVerts[j].x > 0) || (from.x < 0 && allVerts[j].x < 0)) {
          closestDist = d;
          closestIdx = j;
        }
      }
    }
    if (closestIdx === -1) continue;
    const to = allVerts[closestIdx];

    // Color by z-position (anterior/posterior)
    const t = THREE.MathUtils.clamp((from.z + 1.4) / 2.8, 0, 1);
    const col = t > 0.5
      ? blueColor.clone().lerp(cyanColor, (t - 0.5) * 2)
      : purpleColor.clone().lerp(blueColor, t * 2);

    linePositions.push(from.x, from.y, from.z, to.x, to.y, to.z);
    lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
  }

  return { linePositions: new Float32Array(linePositions), lineColors: new Float32Array(lineColors) };
}

export const ProceduralBrain = ({ isMobile = false }: ProceduralBrainProps) => {
  const brainGroupRef = useRef<THREE.Group>(null);
  const glowCoreRef = useRef<THREE.Mesh>(null);

  const segU = isMobile ? 40 : 56;
  const segV = isMobile ? 30 : 42;

  // Hemisphere geometries
  const leftGeo = useMemo(() => createHemisphereGeometry(false, segU, segV), [segU, segV]);
  const rightGeo = useMemo(() => createHemisphereGeometry(true, segU, segV), [segU, segV]);
  const leftCerebellumGeo = useMemo(() => createCerebellumGeometry(false), []);
  const rightCerebellumGeo = useMemo(() => createCerebellumGeometry(true), []);
  const brainStemGeo = useMemo(() => createBrainStemGeometry(), []);

  // Neural network data from cortical surface
  const { nodes, nodePositions, nodeColors, connectionIndices } = useMemo(() => {
    const nodesList: THREE.Vector3[] = [];
    const leftPositions = leftGeo.attributes.position.array as Float32Array;
    const rightPositions = rightGeo.attributes.position.array as Float32Array;
    const sampleStep = isMobile ? 8 : 5;
    const totalLeftVerts = leftPositions.length / 3;
    const totalRightVerts = rightPositions.length / 3;

    for (let i = 0; i < totalLeftVerts; i += sampleStep) {
      nodesList.push(new THREE.Vector3(leftPositions[i * 3], leftPositions[i * 3 + 1], leftPositions[i * 3 + 2]));
    }
    for (let i = 0; i < totalRightVerts; i += sampleStep) {
      nodesList.push(new THREE.Vector3(rightPositions[i * 3], rightPositions[i * 3 + 1], rightPositions[i * 3 + 2]));
    }

    const pos = new Float32Array(nodesList.length * 3);
    const col = new Float32Array(nodesList.length * 3);
    const cyan = new THREE.Color('#00f0ff');
    const blue = new THREE.Color('#38bdf8');
    const purple = new THREE.Color('#a855f7');
    const tempCol = new THREE.Color();

    for (let i = 0; i < nodesList.length; i++) {
      const v = nodesList[i];
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;

      const t = THREE.MathUtils.clamp((v.z + 1.4) / 2.8, 0, 1);
      if (t > 0.5) {
        tempCol.lerpColors(blue, cyan, (t - 0.5) * 2);
      } else {
        tempCol.lerpColors(purple, blue, t * 2);
      }
      col[i * 3] = tempCol.r;
      col[i * 3 + 1] = tempCol.g;
      col[i * 3 + 2] = tempCol.b;
    }

    // Build connections
    const connections: [number, number][] = [];
    const maxDist = isMobile ? 0.44 : 0.40;
    const maxConnectionsPerNode = isMobile ? 2 : 3;

    for (let i = 0; i < nodesList.length; i++) {
      let count = 0;
      for (let j = i + 1; j < nodesList.length; j++) {
        const sameHemisphere = (nodesList[i].x > 0 && nodesList[j].x > 0) || (nodesList[i].x < 0 && nodesList[j].x < 0);
        const nearCorpusCallosum = Math.abs(nodesList[i].x) < 0.25 && Math.abs(nodesList[j].x) < 0.25 && Math.abs(nodesList[i].y) < 0.2;

        if (sameHemisphere || nearCorpusCallosum) {
          const d = nodesList[i].distanceTo(nodesList[j]);
          if (d > 0.10 && d < maxDist) {
            connections.push([i, j]);
            count++;
            if (count >= maxConnectionsPerNode) break;
          }
        }
      }
    }

    return { nodes: nodesList, nodePositions: pos, nodeColors: col, connectionIndices: connections };
  }, [leftGeo, rightGeo, isMobile]);

  // Surface pathways — glowing lines across cortex
  const { linePositions, lineColors } = useMemo(
    () => buildSurfacePathways(leftGeo, rightGeo, isMobile ? 60 : 100),
    [leftGeo, rightGeo, isMobile]
  );

  // Floating animation and slow rotation
  useFrame((state, delta) => {
    if (brainGroupRef.current) {
      brainGroupRef.current.rotation.y += delta * 0.20;
      // Subtle float
      brainGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      // Organic breathing
      const breath = 1.0 + Math.sin(state.clock.elapsedTime * 1.2) * 0.012;
      brainGroupRef.current.scale.setScalar(breath);
    }
    if (glowCoreRef.current) {
      const pulse = 0.06 + Math.abs(Math.sin(state.clock.elapsedTime * 1.5)) * 0.06;
      (glowCoreRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  return (
    <group ref={brainGroupRef}>
      {/* === CEREBRAL HEMISPHERES === */}

      {/* Left hemisphere — translucent holographic cortex */}
      <mesh geometry={leftGeo}>
        <meshPhysicalMaterial
          color="#04112a"
          emissive="#00c8ff"
          emissiveIntensity={0.22}
          roughness={0.18}
          metalness={0.75}
          transmission={0.25}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right hemisphere */}
      <mesh geometry={rightGeo}>
        <meshPhysicalMaterial
          color="#050e24"
          emissive="#9b3ff7"
          emissiveIntensity={0.20}
          roughness={0.18}
          metalness={0.75}
          transmission={0.25}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left hemisphere wireframe overlay — cyan gyri lines */}
      <mesh geometry={leftGeo}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Right hemisphere wireframe overlay — purple/blue gyri lines */}
      <mesh geometry={rightGeo}>
        <meshBasicMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === CEREBELLUM === */}
      <mesh geometry={leftCerebellumGeo}>
        <meshStandardMaterial
          color="#06152e"
          emissive="#38bdf8"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.90}
        />
      </mesh>
      <mesh geometry={rightCerebellumGeo}>
        <meshStandardMaterial
          color="#06152e"
          emissive="#a855f7"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.90}
        />
      </mesh>

      {/* Cerebellum wireframe details */}
      <mesh geometry={leftCerebellumGeo}>
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.20}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={rightCerebellumGeo}>
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.20}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === BRAIN STEM === */}
      <mesh geometry={brainStemGeo} position={[0, -1.05, 0.20]}>
        <meshStandardMaterial
          color="#040f22"
          emissive="#00f0ff"
          emissiveIntensity={0.18}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* === GLOWING SURFACE PATHWAY LINES === */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* === SYNAPTIC NODE POINTS === */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeColors.length / 3}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.06 : 0.055}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* === ELECTRIC PULSE SIGNALS === */}
      <NeuralSynapses nodes={nodes} connections={connectionIndices} isMobile={isMobile} />

      {/* === INNER VOLUMETRIC GLOW CORE === */}
      <mesh ref={glowCoreRef} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.80, 16, 16]} />
        <meshBasicMaterial
          color="#00c8ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Larger soft outer glow */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[1.30, 12, 12]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
