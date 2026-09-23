import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const HolographicPlatform = () => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const glowDiscRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.12;
    if (midRingRef.current) midRingRef.current.rotation.z -= delta * 0.22;
    if (innerRingRef.current) innerRingRef.current.rotation.z += delta * 0.38;
    if (glowDiscRef.current) {
      const pulse = 0.05 + Math.abs(Math.sin(state.clock.elapsedTime * 0.9)) * 0.05;
      (glowDiscRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
    // Scanning ring that grows outward and resets
    if (scanLineRef.current) {
      const t = (state.clock.elapsedTime % 3.5) / 3.5;
      const r = 0.5 + t * 2.2;
      scanLineRef.current.scale.setScalar(r);
      (scanLineRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.35;
    }
  });

  return (
    <group position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Outer segmented ring */}
      <mesh ref={outerRingRef}>
        <ringGeometry args={[2.5, 2.56, 80]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.30}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Middle ring — purple accent */}
      <mesh ref={midRingRef}>
        <ringGeometry args={[1.90, 1.945, 60]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner ring — cyan */}
      <mesh ref={innerRingRef}>
        <ringGeometry args={[1.25, 1.29, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Glow disc */}
      <mesh ref={glowDiscRef}>
        <circleGeometry args={[1.1, 48]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Expanding scan ring */}
      <mesh ref={scanLineRef}>
        <ringGeometry args={[1.0, 1.04, 48]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.30}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Holographic pillar */}
      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.3, 2.0, 1.1, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer decorative tick marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const r = 2.65;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.06, 0.18]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};
