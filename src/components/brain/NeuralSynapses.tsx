import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralSynapsesProps {
  nodes: THREE.Vector3[];
  connections: [number, number][];
  isMobile?: boolean;
}

export const NeuralSynapses = ({ nodes, connections, isMobile = false }: NeuralSynapsesProps) => {
  const signalCount = Math.min(connections.length, isMobile ? 20 : 35);
  const signalsRef = useRef<THREE.Points>(null);
  const trailsRef = useRef<THREE.Points>(null);

  const TRAIL_LEN = 4; // number of trail points per signal

  // Initialize signals on random connection segments
  const signalsData = useMemo(() => {
    return Array.from({ length: signalCount }, () => ({
      connIdx: Math.floor(Math.random() * Math.max(1, connections.length)),
      progress: Math.random(),
      speed: 0.25 + Math.random() * 0.65,
    }));
  }, [connections, signalCount]);

  const [signalPositions, signalColors] = useMemo(() => {
    const pos = new Float32Array(signalCount * 3);
    const col = new Float32Array(signalCount * 3);
    const cyan = new THREE.Color('#00f0ff');
    const white = new THREE.Color('#e0f2fe');
    const purple = new THREE.Color('#c084fc');

    for (let i = 0; i < signalCount; i++) {
      const r = Math.random();
      const c = r > 0.6 ? cyan : r > 0.3 ? white : purple;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [signalCount]);

  // Trail points (ghost trail behind each signal)
  const trailPositions = useMemo(
    () => new Float32Array(signalCount * TRAIL_LEN * 3),
    [signalCount]
  );
  const trailColors = useMemo(() => {
    const col = new Float32Array(signalCount * TRAIL_LEN * 3);
    for (let i = 0; i < signalCount; i++) {
      const baseR = signalColors[i * 3];
      const baseG = signalColors[i * 3 + 1];
      const baseB = signalColors[i * 3 + 2];
      for (let t = 0; t < TRAIL_LEN; t++) {
        const fade = 1.0 - t / TRAIL_LEN;
        col[(i * TRAIL_LEN + t) * 3] = baseR * fade;
        col[(i * TRAIL_LEN + t) * 3 + 1] = baseG * fade;
        col[(i * TRAIL_LEN + t) * 3 + 2] = baseB * fade;
      }
    }
    return col;
  }, [signalColors, signalCount]);

  useFrame((_, delta) => {
    if (!signalsRef.current || connections.length === 0) return;

    const posAttr = signalsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const trailAttr = trailsRef.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;

    for (let i = 0; i < signalCount; i++) {
      const sig = signalsData[i];
      const prevProgress = sig.progress;
      sig.progress += delta * sig.speed;

      if (sig.progress >= 1) {
        sig.progress = 0;
        sig.connIdx = Math.floor(Math.random() * connections.length);
      }

      const conn = connections[sig.connIdx];
      if (!conn) continue;
      const [startIdx, endIdx] = conn;
      const startNode = nodes[startIdx];
      const endNode = nodes[endIdx];

      if (!startNode || !endNode) continue;

      const x = THREE.MathUtils.lerp(startNode.x, endNode.x, sig.progress);
      const y = THREE.MathUtils.lerp(startNode.y, endNode.y, sig.progress);
      const z = THREE.MathUtils.lerp(startNode.z, endNode.z, sig.progress);

      posAttr.setXYZ(i, x, y, z);

      // Trail behind
      if (trailAttr) {
        for (let t = 0; t < TRAIL_LEN; t++) {
          const trailProgress = Math.max(0, prevProgress - t * 0.04);
          const tx = THREE.MathUtils.lerp(startNode.x, endNode.x, trailProgress);
          const ty = THREE.MathUtils.lerp(startNode.y, endNode.y, trailProgress);
          const tz = THREE.MathUtils.lerp(startNode.z, endNode.z, trailProgress);
          trailAttr.setXYZ(i * TRAIL_LEN + t, tx, ty, tz);
        }
        trailAttr.needsUpdate = true;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <>
      {/* Main signal head — bright */}
      <points ref={signalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={signalCount}
            array={signalPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={signalCount}
            array={signalColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.09 : 0.08}
          vertexColors
          transparent
          opacity={1.0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Trail ghost — fades behind signal */}
      <points ref={trailsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={signalCount * TRAIL_LEN}
            array={trailPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={signalCount * TRAIL_LEN}
            array={trailColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.055 : 0.05}
          vertexColors
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};
