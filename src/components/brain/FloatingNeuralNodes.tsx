import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingNeuralNodesProps {
  count?: number;
}

// A few distinct floating neural nodes orbiting the brain
export const FloatingNeuralNodes = ({ count = 8 }: FloatingNeuralNodesProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const nodeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.85 + Math.random() * 0.55;
      const height = (Math.random() - 0.5) * 1.4;
      const orbitSpeed = (0.18 + Math.random() * 0.22) * (Math.random() > 0.5 ? 1 : -1);
      const pulseBias = Math.random() * Math.PI * 2;
      return { angle, radius, height, orbitSpeed, pulseBias };
    });
  }, [count]);

  const colors = useMemo(() => {
    return [
      '#00f0ff', '#38bdf8', '#818cf8', '#a855f7',
      '#c084fc', '#67e8f9', '#2dd4bf', '#7c3aed',
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      if (!(child instanceof THREE.Mesh)) return;
      const data = nodeData[i];
      if (!data) return;

      const currentAngle = data.angle + t * data.orbitSpeed;
      child.position.x = Math.cos(currentAngle) * data.radius;
      child.position.y = data.height + Math.sin(t * 0.6 + data.pulseBias) * 0.12;
      child.position.z = Math.sin(currentAngle) * data.radius;

      // Pulsing glow
      const scale = 0.85 + 0.15 * Math.abs(Math.sin(t * 1.2 + data.pulseBias));
      child.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {nodeData.map((data, i) => {
        const color = colors[i % colors.length];
        return (
          <mesh key={i} position={[
            Math.cos(data.angle) * data.radius,
            data.height,
            Math.sin(data.angle) * data.radius,
          ]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.92}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {/* Connecting filaments from each node toward origin */}
      {nodeData.map((data, i) => {
        const linePos = new Float32Array([
          Math.cos(data.angle) * data.radius, data.height, Math.sin(data.angle) * data.radius,
          0, 0, 0,
        ]);
        const color = new THREE.Color(colors[i % colors.length]);
        const lineCol = new Float32Array([
          color.r, color.g, color.b,
          color.r * 0.1, color.g * 0.1, color.b * 0.1,
        ]);

        return (
          <lineSegments key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={linePos} itemSize={3} />
              <bufferAttribute attach="attributes-color" count={2} array={lineCol} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        );
      })}
    </group>
  );
};
