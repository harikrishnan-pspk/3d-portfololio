import { useRef, useEffect, useState, Suspense, Component, ReactNode, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { BrainModel } from './BrainModel';
import { HolographicPlatform } from './brain/HolographicPlatform';
import { FloatingParticles } from './brain/FloatingParticles';
import { BrainCircuit, AlertCircle, Move3d } from 'lucide-react';

// ─── Error Boundary: shows "3D Brain Asset Required" if loading fails ──────────
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class BrainErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md max-w-sm flex flex-col items-center gap-3">
            <AlertCircle className="w-10 h-10 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-200">3D Brain Asset Required</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Place <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">brain.glb</code> inside{' '}
              <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">public/models/</code> to render the anatomical model.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Main 3-D scene inside the Canvas ─────────────────────────────────────────
interface SceneContentProps {
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  prefersReducedMotion: boolean;
  isInteracting: boolean;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

const SceneContent = ({
  viewportMode,
  prefersReducedMotion,
  isInteracting,
  onInteractionStart,
  onInteractionEnd,
}: SceneContentProps) => {
  const hoverGroupRef = useRef<THREE.Group>(null);

  // Subtle mouse hover effect: tilts slightly towards pointer when not dragging
  useFrame((state) => {
    if (!hoverGroupRef.current || isInteracting || prefersReducedMotion) return;
    const { pointer } = state;
    hoverGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      hoverGroupRef.current.rotation.x,
      -pointer.y * 0.07,
      0.05
    );
    hoverGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      hoverGroupRef.current.rotation.y,
      pointer.x * 0.09,
      0.05
    );
  });

  return (
    <>
      {/* ── Real 3D OrbitControls with smooth damping and automatic rotation ── */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={6.0}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={Math.PI / 8}
        autoRotate={!isInteracting && !prefersReducedMotion}
        autoRotateSpeed={0.7}
        rotateSpeed={0.65}
        zoomSpeed={0.8}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        onStart={onInteractionStart}
        onEnd={onInteractionEnd}
      />

      {/* ── Lighting Rig: Soft rim lighting + cyan key + blue fill ── */}
      <ambientLight intensity={0.55} />

      {/* Cyan Key Light — Front / top right */}
      <pointLight position={[2.5, 2.5, 4.0]} intensity={2.8} color="#00e5ff" />

      {/* Soft Purple Rim Light — Back / left (highlights contours of the gyri) */}
      <pointLight position={[-3.8, 0.5, -2.8]} intensity={2.8} color="#c084fc" />

      {/* Deep Blue Fill — Right */}
      <pointLight position={[3.5, 0.2, 1.8]} intensity={1.4} color="#2563eb" />

      {/* Soft Top Glow */}
      <pointLight position={[0, 4.5, 0.8]} intensity={0.7} color="#a5b4fc" />

      {/* Bottom Bounce Glow */}
      <pointLight position={[0, -3.5, 1.0]} intensity={0.5} color="#00f0ff" />

      {/* ── Hover reaction group (mouse-follow parallax) ── */}
      <group ref={hoverGroupRef}>
        {/* Actual Anatomical Human Brain Model */}
        <BrainModel
          viewportMode={viewportMode}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Holographic Circular Platform below brain */}
        <HolographicPlatform />

        {/* Subtle Neural / Ambient Cosmic Particles */}
        <FloatingParticles count={viewportMode === 'mobile' ? 50 : viewportMode === 'tablet' ? 90 : 130} />
      </group>
    </>
  );
};

// ─── Loading fallback ─────────────────────────────────────────────────────────
const BrainFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
    <div className="relative flex flex-col items-center gap-4">
      {/* Pulsing brain circuit icon */}
      <div className="relative p-5 rounded-full bg-slate-900/80 border border-cyan-500/30">
        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" />
        <BrainCircuit className="w-12 h-12 text-cyan-400" />
      </div>
      {/* Progress bar shimmer */}
      <div className="w-44 h-px bg-slate-800 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ animation: 'shimmer 1.8s ease-in-out infinite' }}
        />
      </div>
      <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-slate-500">
        Loading Neural Core...
      </span>
    </div>
  </div>
);

// ─── Public BrainScene Component ───────────────────────────────────────────────
export const BrainScene = () => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const handleInteractionStart = useCallback(() => {
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setIsInteracting(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    // Smoothly resume slow automatic rotation after 1.4s of user idle
    resumeTimer.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 1400);
  }, []);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setViewportMode('mobile');
      else if (w < 1024) setViewportMode('tablet');
      else setViewportMode('desktop');
    };
    check();
    window.addEventListener('resize', check);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    return () => {
      window.removeEventListener('resize', check);
      mediaQuery.removeEventListener('change', motionHandler);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  // Responsive camera parameters
  const cameraConfig =
    viewportMode === 'mobile'
      ? { position: [0, 0, 5.2] as [number, number, number], fov: 46 }
      : viewportMode === 'tablet'
      ? { position: [0, 0, 5.0] as [number, number, number], fov: 45 }
      : { position: [0, 0, 4.8] as [number, number, number], fov: 45 };

  // STEP 9 DEBUG OUTPUT
  console.log("CAMERA POSITION:", cameraConfig.position, "FOV:", cameraConfig.fov);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] select-none">

      {/* Ambient background radial glow behind the brain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(0,180,255,0.08) 0%, rgba(120,50,255,0.04) 45%, transparent 72%)',
        }}
      />

      <BrainErrorBoundary>
        <Suspense fallback={<BrainFallback />}>
          <Canvas
            camera={{
              position: cameraConfig.position,
              fov: cameraConfig.fov,
              near: 0.1,
              far: 1000,
            }}
            dpr={[1, viewportMode === 'mobile' ? 1.5 : 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ width: '100%', height: '100%', display: 'block' }}
            className="cursor-grab active:cursor-grabbing"
          >
            <SceneContent
              viewportMode={viewportMode}
              prefersReducedMotion={prefersReducedMotion}
              isInteracting={isInteracting}
              onInteractionStart={handleInteractionStart}
              onInteractionEnd={handleInteractionEnd}
            />
          </Canvas>
        </Suspense>
      </BrainErrorBoundary>

      {/* Interactive Controls Hint & HUD Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400/60" />
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-cyan-300/75 flex items-center gap-1.5">
            <Move3d className="w-3 h-3 text-cyan-400" />
            NEURAL CORE // 3D
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400/60" />
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono tracking-wider text-slate-400/80 uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
          </span>
          <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
        </div>
      </div>

      {/* Edge glows */}
      <div className="absolute -bottom-6 w-4/5 h-20 bg-gradient-to-t from-cyan-500/15 via-purple-500/8 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-8 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};


