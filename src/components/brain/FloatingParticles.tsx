import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
}

// Vertex shader: per-neuron size attenuation, pulsing, and synaptic firing bursts
const vertexShader = `
  attribute float aSize;
  attribute float aIntensity;
  attribute float aSpeed;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vIntensity;

  void main() {
    vColor = aColor;

    // Continuous rhythmic breathing pulse
    float pulse = sin(uTime * aSpeed + aPhase);
    
    // High-frequency subtle synaptic flicker
    float flicker = sin(uTime * (aSpeed * 4.2) + aPhase * 3.1) * 0.18;
    
    // Occasional firing burst (sharp spike simulating an active action potential)
    float burst = pow(max(0.0, sin(uTime * (aSpeed * 0.35) + aPhase)), 10.0) * 0.75;
    
    float currentIntensity = aIntensity + pulse * 0.3 + flicker + burst;
    vIntensity = clamp(currentIntensity, 0.25, 2.0);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Size attenuation based on depth and pixel ratio
    gl_PointSize = aSize * vIntensity * uPixelRatio * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader: Gaussian optical core + soft luminous bloom halo
const fragmentShader = `
  varying vec3 vColor;
  varying float vIntensity;

  void main() {
    // Distance from center of point sprite [0, 0.5]
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Mathematical Gaussian core + expansive luminous bloom halo
    float core = exp(-dist * dist * 38.0);         // Intense needle-sharp central spark
    float innerGlow = exp(-dist * dist * 12.0);    // Warm luminous core
    float outerHalo = exp(-dist * 5.8);            // Soft radiant atmospheric halo
    
    float alpha = core * 0.95 + innerGlow * 0.55 + outerHalo * 0.35;

    // When firing with high intensity, center shifts into brilliant white-hot cyan
    vec3 finalColor = vColor;
    if (vIntensity > 1.1) {
      finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), min(1.0, (vIntensity - 1.1) * 0.75));
    }

    gl_FragColor = vec4(finalColor * vIntensity, alpha);
  }
`;

export const FloatingParticles = ({ count = 130 }: FloatingParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Anatomical distribution of neural particles inside and along the brain structure
  const { positions, colors, sizes, intensities, speeds, phases, linePositions, lineColors } =
    useMemo(() => {
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sz = new Float32Array(count);
      const intens = new Float32Array(count);
      const spd = new Float32Array(count);
      const phs = new Float32Array(count);

      // Curated luminous neural palette: Cyan, Sky Blue, Sapphire, Violet
      const palette = [
        new THREE.Color('#00f0ff'), // Vibrant cyan (dominant firing color)
        new THREE.Color('#38bdf8'), // Sky blue
        new THREE.Color('#00a6ff'), // Bright electric blue
        new THREE.Color('#818cf8'), // Periwinkle synaptic node
        new THREE.Color('#a855f7'), // Purple/violet synapse
        new THREE.Color('#e0f2fe'), // Near-white active neuron spark
      ];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let x = 0, y = 0, z = 0;

        if (rand < 0.35) {
          // Left cerebral hemisphere: clustered within anatomical ellipsoid
          const r = Math.pow(Math.random(), 0.6);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          x = -0.52 + r * 0.62 * Math.sin(phi) * Math.cos(theta);
          y = 0.12 + r * 0.72 * Math.sin(phi) * Math.sin(theta);
          z = -0.05 + r * 1.02 * Math.cos(phi);
        } else if (rand < 0.70) {
          // Right cerebral hemisphere: clustered within anatomical ellipsoid
          const r = Math.pow(Math.random(), 0.6);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          x = 0.52 + r * 0.62 * Math.sin(phi) * Math.cos(theta);
          y = 0.12 + r * 0.72 * Math.sin(phi) * Math.sin(theta);
          z = -0.05 + r * 1.02 * Math.cos(phi);
        } else if (rand < 0.85) {
          // Cerebellum (posterior-inferior lobes)
          const side = Math.random() > 0.5 ? 0.38 : -0.38;
          x = side + (Math.random() - 0.5) * 0.45;
          y = -0.72 + (Math.random() - 0.5) * 0.38;
          z = -0.58 + (Math.random() - 0.5) * 0.42;
        } else if (rand < 0.94) {
          // Brain stem (inferior central column)
          x = (Math.random() - 0.5) * 0.28;
          y = -1.12 + (Math.random() - 0.5) * 0.42;
          z = -0.15 + (Math.random() - 0.5) * 0.28;
        } else {
          // Subtle pericortical aura: just skimming the outer folds
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          x = 1.35 * Math.sin(phi) * Math.cos(theta);
          y = 1.15 * Math.sin(phi) * Math.sin(theta);
          z = 1.45 * Math.cos(phi);
        }

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        // Color selection: weighted heavily toward cyan & electric blue
        const pickedColor = palette[Math.floor(Math.random() * palette.length)];
        col[i * 3] = pickedColor.r;
        col[i * 3 + 1] = pickedColor.g;
        col[i * 3 + 2] = pickedColor.b;

        // Varied sizes: mostly refined firing points (0.09–0.18), with some prominent neural hubs (0.24–0.32)
        const isHub = Math.random() > 0.82;
        sz[i] = isHub ? 0.22 + Math.random() * 0.08 : 0.10 + Math.random() * 0.08;

        // Base intensity level (natural variation between subtle and bright)
        intens[i] = isHub ? 0.95 + Math.random() * 0.35 : 0.55 + Math.random() * 0.45;

        // Pulsing speed and phase offset for asynchronous neural firing
        spd[i] = 1.0 + Math.random() * 2.4;
        phs[i] = Math.random() * Math.PI * 2;
      }

      // Generate synaptic filament lines connecting close neighboring neurons
      const linePosArray: number[] = [];
      const lineColArray: number[] = [];
      const maxConnDist = 0.55;
      const maxConnections = 45;
      let connections = 0;

      for (let i = 0; i < count && connections < maxConnections; i++) {
        for (let j = i + 1; j < count && connections < maxConnections; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxConnDist * maxConnDist) {
            linePosArray.push(
              pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
              pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
            );
            lineColArray.push(
              col[i * 3], col[i * 3 + 1], col[i * 3 + 2],
              col[j * 3], col[j * 3 + 1], col[j * 3 + 2]
            );
            connections++;
          }
        }
      }

      return {
        positions: pos,
        colors: col,
        sizes: sz,
        intensities: intens,
        speeds: spd,
        phases: phs,
        linePositions: new Float32Array(linePosArray),
        lineColors: new Float32Array(lineColArray),
      };
    }, [count]);

  // Uniforms for the points shader
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2.0) : 1 },
  }), []);

  // Animation frame: update time uniform and synaptic line opacity
  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    if (pointsRef.current) {
      // Very gentle drift
      pointsRef.current.rotation.y += delta * 0.03;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.03;
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        // Subtle synaptic transmission pulsation
        mat.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.8) * 0.06;
      }
    }
  });

  return (
    <group>
      {/* ── Glowing Neural Particles with Gaussian Bloom Halos ── */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aIntensity"
            count={intensities.length}
            array={intensities}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            count={speeds.length}
            array={speeds}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            count={phases.length}
            array={phases}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ── Subtle Synaptic Pathway Filaments Connecting Neurons ── */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
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
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  );
};

