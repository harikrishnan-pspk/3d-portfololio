import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Terminal, Sparkles } from 'lucide-react';
import { BrainScene } from './BrainScene';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* 2-Column Grid: LEFT Text & CTAs, RIGHT 3D Brain Core */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* LEFT COLUMN: 5/12 — Recruiter-friendly identity & CTA */}
        <div className="lg:col-span-5 z-10 flex flex-col items-start">
          {/* Holographic Profile Node & Identity Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 sm:gap-5 mb-6"
          >
            {/* Holographic Circular HUD Frame */}
            <div className="relative group flex-shrink-0">
              {/* Outer Cyan & Purple Glow */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500/40 via-purple-500/30 to-sky-400/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Counter-rotating Cyber Tick Ring */}
              <div
                className="absolute -inset-2 rounded-full border border-cyan-400/35 border-dashed animate-spin pointer-events-none"
                style={{ animationDuration: '24s' }}
              />

              {/* Inner HUD Circular Frame */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-b from-cyan-400 via-slate-800 to-purple-500 overflow-hidden shadow-xl shadow-cyan-950/50">
                <img
                  src="/images/hari_profile.jpg"
                  alt="Hari Krishnan"
                  className="w-full h-full object-cover object-top rounded-full transition-transform duration-300 group-hover:scale-105"
                />
                {/* Subtle Scanline Overlay */}
                <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />
              </div>

              {/* Active Synapse Beacon */}
              <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#030712]" />
              </span>
            </div>

            {/* Profile Node Telemetry Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>BIO_NODE // VERIFIED</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Hari Krishnan
              </span>
              <span className="text-xs sm:text-sm font-mono text-cyan-300">
                Frontend Developer | CSE-AI
              </span>
            </div>
          </motion.div>

          {/* Large Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-3">
              <span className="block text-white">Inside</span>
              <span className="block text-gradient-cyan">
                Hari's Mind
              </span>
            </h1>
          </motion.div>

          {/* Subtitle / Status Line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 my-2 text-xs font-mono text-slate-400"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEURAL CORE ONLINE // INTERACTIVE AI PORTFOLIO</span>
          </motion.div>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg mb-8"
          >
            A journey through my skills, projects, ideas and experiences.
          </motion.p>

          {/* Primary Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#about"
              onClick={onExploreClick}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-medium text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 shadow-glow-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="font-semibold tracking-wide text-sm sm:text-base">
                Explore My Mind
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Interactive Neural Canvas</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 7/12 — Large Interactive 3D Brain Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-7 relative w-full h-[520px] sm:h-[600px] lg:h-[680px] flex items-center justify-center"
        >
          {/* Deep backdrop radial glow */}
          <div className="absolute w-80 sm:w-[28rem] lg:w-[36rem] h-80 sm:h-[28rem] lg:h-[36rem] rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none" />
          <div className="absolute w-64 h-64 rounded-full bg-purple-600/8 blur-[80px] pointer-events-none" />

          <BrainScene />
        </motion.div>
      </div>

      {/* Secondary Subtle Instruction: Scroll to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col items-center justify-center pt-4"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-widest opacity-80 group-hover:opacity-100">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="p-1 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
