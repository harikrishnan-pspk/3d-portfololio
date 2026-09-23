import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Grid,
} from 'lucide-react';
import { NeuralNetwork } from '../components/achievements/NeuralNetwork';
import { MobileNeuralPathway } from '../components/achievements/MobileNeuralPathway';
import { CertificateDetail } from '../components/achievements/CertificateDetail';
import { Certificate } from '../components/achievements/certificateData';

export const AchievementsSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<'network' | 'pathway'>('network');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detect screen size for default presentation
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 1024) {
        setViewMode('pathway');
      } else {
        setViewMode('network');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ambient Floating Background Neural Particles (Lightweight 2D Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle background motes
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(168, 85, 247, 0.35)',
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time + p.phase) * 0.5 + 0.5;
        const currentRadius = p.radius + pulse * 1.2;

        // Radial glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius * 3.5
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="achievements"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Background Canvas Particles ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60 z-0"
      />

      {/* ── Background Subtle Glow Gradients ── */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-start mb-12 sm:mb-16">
        {/* System Indicator Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <Brain className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>CERTIFICATION MEMORY // 20 NODES ONLINE</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          ACHIEVEMENTS
        </h2>

        {/* Subtitle */}
        <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide mb-2">
          "Knowledge acquired. Skills connected."
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Explore the neural certification network inside Hari's digital brain—a live topological map of verified artificial intelligence, cloud architecture, and software development proficiencies.
        </p>
      </div>

      {/* ── Futuristic Statistics Area HUD ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* Stat 1: 20 Certifications */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              SYNAPSE CAPACITY
            </span>
            <Trophy className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5">
            <span>20</span>
            <span className="text-xs font-mono font-medium text-cyan-400">NODES</span>
          </div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
            CERTIFICATIONS
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        </div>

        {/* Stat 2: AI + Software Core Areas */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-sky-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              DOMAIN COVERAGE
            </span>
            <Cpu className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5">
            <span>AI + SOFTWARE</span>
          </div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
            CORE AREAS
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
        </div>

        {/* Stat 3: Multiple Learning Paths */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-purple-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              BRANCHED SYNAPSE
            </span>
            <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5">
            <span>MULTIPLE</span>
          </div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
            LEARNING PATHS
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        </div>
      </div>

      {/* ── View Toggle Switch (Desktop & Tablet) ── */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Neural Topology</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('network')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'network'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neural Constellation</span>
            <span className="sm:hidden">Graph</span>
          </button>
          <button
            onClick={() => setViewMode('pathway')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'pathway'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vertical Pathway</span>
            <span className="sm:hidden">Spine</span>
          </button>
        </div>
      </div>

      {/* ── Main Neural Visualization Display ── */}
      <div className="relative z-10">
        {viewMode === 'network' ? (
          <motion.div
            key="network-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <NeuralNetwork onSelectCertificate={setSelectedCertificate} />
          </motion.div>
        ) : (
          <motion.div
            key="pathway-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNeuralPathway onSelectCertificate={setSelectedCertificate} />
          </motion.div>
        )}
      </div>

      {/* ── Holographic Certificate Detail Modal ── */}
      <CertificateDetail
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
