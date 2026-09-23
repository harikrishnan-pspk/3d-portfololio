import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BrainModelProps {
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  prefersReducedMotion?: boolean;
}

export const BrainModel = ({
  viewportMode = 'desktop',
  prefersReducedMotion = false,
}: BrainModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  // Load actual human brain 3D model
  const brainModelUrl = `${import.meta.env.BASE_URL}models/brain.glb`;
  const { scene } = useGLTF(brainModelUrl);

  // Dark blue / cyan holographic material highlighting the gyri folds and sulci
  const brainMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#071c3b'),
      emissive: new THREE.Color('#006aa8'),
      emissiveIntensity: 0.36,
      metalness: 0.45,
      roughness: 0.28,
      clearcoat: 0.75,
      clearcoatRoughness: 0.18,
      transmission: 0.08,
      transparent: true,
      opacity: 0.96,
      side: THREE.FrontSide,
    });
    matRef.current = mat;
    return mat;
  }, []);

  // Subtle neural wireframe overlay that highlights the topology without obscuring anatomy
  const wireMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00e5ff'),
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Calculate actual bounding box and normalize model directly
  const { brainObject, wireObject } = useMemo(() => {
    // Measure actual bounding box of the loaded GLB
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Target visual size in THREE.js world units:
    // Desktop: ~3.8 units (occupies ~45% of hero right side, ~400-480px on screen)
    // Tablet: ~3.0 units (~300-360px)
    // Mobile: ~2.4 units (~220-280px)
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const targetSize =
      viewportMode === 'mobile'
        ? 2.4
        : viewportMode === 'tablet'
        ? 3.0
        : 3.8;

    const normalizedScale = targetSize / maxDimension;

    // STEP 9 DEBUG OUTPUT
    console.log("BRAIN GLB SIZE:", size);
    console.log("BRAIN GLB CENTER:", center);
    console.log("NORMALIZED SCALE:", normalizedScale);

    // Clone 1: Solid holographic brain
    const solidClone = scene.clone(true);
    solidClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = brainMaterial;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    // Clone 2: Wireframe accent
    const wireClone = scene.clone(true);
    wireClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = wireMaterial;
      }
    });

    // Center both clones so their exact center of mass sits at [0, 0, 0]
    solidClone.position.set(-center.x, -center.y, -center.z);
    wireClone.position.set(-center.x, -center.y, -center.z);

    // Parent group with normalizedScale applied directly to the Three.js group
    const brainGroup = new THREE.Group();
    brainGroup.scale.set(normalizedScale, normalizedScale, normalizedScale);
    brainGroup.add(solidClone);

    const wireGroup = new THREE.Group();
    wireGroup.scale.set(normalizedScale, normalizedScale, normalizedScale);
    wireGroup.add(wireClone);

    return { brainObject: brainGroup, wireObject: wireGroup };
  }, [scene, viewportMode, brainMaterial, wireMaterial]);

  // 3/4 front view base orientation:
  // Brain has hemispheres along Z and depth along X.
  // Rotate around Y by Math.PI/2 - 0.42 to showcase frontal lobe, temporal lobe, both hemispheres, and cerebellum.
  const baseRotationY = Math.PI / 2 - 0.42;

  // Animation loop: subtle floating + animated energy pulse
  useFrame((state) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Subtle floating levitation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.75) * 0.035;

      // Small animated energy pulse through emissive glow
      if (matRef.current) {
        matRef.current.emissiveIntensity =
          0.36 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0.06, baseRotationY, 0]}>
      <primitive object={brainObject} />
      <primitive object={wireObject} />
    </group>
  );
};

// Preload the real brain model
useGLTF.preload(`${import.meta.env.BASE_URL}models/brain.glb`);




