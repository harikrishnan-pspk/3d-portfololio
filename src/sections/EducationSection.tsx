import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Cpu,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  duration: string;
  startYear: string;
  endYear: string;
  location: string;
  stream: string;
  status: 'CURRENT' | 'COMPLETED';
  statusLabel: string;
  hoverBadge: string;
  isPrimary: boolean;
  color: string;
  glowColor: string;
  icon: typeof GraduationCap;
}

export const EducationSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Exact academic data - strictly verified records
  const educationData: EducationItem[] = [
    {
      id: 'btech-ai',
      degree: 'B.TECH',
      field: 'Artificial Intelligence',
      institution: 'Sri Venkatesa Perumal College of Engineering and Technology',
      duration: '2024 — 2028',
      startYear: '2024',
      endYear: '2028',
      location: 'Puttur',
      stream: 'AI',
      status: 'CURRENT',
      statusLabel: 'CURRENT LEARNING NODE',
      hoverBadge: 'CURRENT NODE',
      isPrimary: true,
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.45)',
      icon: Cpu,
    },
    {
      id: 'intermediate-mpc',
      degree: 'INTERMEDIATE',
      institution: 'Himaja Junior College',
      duration: '2022 — 2024',
      startYear: '2022',
      endYear: '2024',
      location: 'Puttur',
      stream: 'MPC',
      status: 'COMPLETED',
      statusLabel: 'FOUNDATION ACQUIRED',
      hoverBadge: 'COMPLETED PATH',
      isPrimary: false,
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      icon: BookOpen,
    },
  ];

  // Ambient floating neural particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(168, 85, 247, 0.3)',
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
        const currentRadius = p.radius + pulse * 1.0;

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
      id="education"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Background Canvas Particles ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60 z-0"
      />

      {/* ── Ambient Radial Glow Layers ── */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-start mb-16 sm:mb-20">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>KNOWLEDGE PATHWAY //</span>
          <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            ACTIVE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          EDUCATION
        </h2>

        {/* Subtitle */}
        <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide mb-2">
          "Where the journey of learning began."
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          The academic trajectory shaping Hari's algorithmic foundation—from mathematical fundamentals in intermediate sciences to advanced artificial intelligence engineering.
        </p>
      </div>

      {/* ── Neural Timeline Pathway Container ── */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Vertical Glowing Neural Conduit Line */}
        <div className="absolute left-6 sm:left-10 top-6 bottom-6 w-[2px]">
          {/* Base conduit track */}
          <div className="absolute inset-0 bg-slate-800/80" />

          {/* Active 2024-2028 gradient conduit */}
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-sky-400 to-purple-500 opacity-70 shadow-[0_0_12px_rgba(0,240,255,0.4)]" />

          {/* Continuous traveling photon energy pulse (2022 -> 2024 -> 2028) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-90"
            style={{ animation: 'pulseConduit 4s ease-in-out infinite' }}
          />
        </div>

        {/* ── Top Year Milestone: 2028 Target ── */}
        <div className="relative flex items-center gap-4 pl-2 sm:pl-6 mb-10">
          <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40 z-20">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold tracking-widest">
              2028
            </span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              HORIZON // DEGREE CONFERRAL
            </span>
          </div>
        </div>

        {/* ── Education Cards Along the Neural Spine ── */}
        <div className="space-y-12 sm:space-y-14">
          {educationData.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredNode === item.id;
            const isPrimary = item.isPrimary;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredNode(item.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Synaptic Node on the Conduit */}
                <div
                  className="absolute left-6 sm:left-10 top-8 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#030712] border-2 flex items-center justify-center transition-all duration-300 z-20"
                  style={{
                    borderColor: item.color,
                    boxShadow: isHovered
                      ? `0 0 20px 4px ${item.glowColor}`
                      : isPrimary
                      ? `0 0 14px 2px ${item.glowColor}`
                      : 'none',
                  }}
                >
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: isHovered ? '#ffffff' : item.color,
                      transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  {isPrimary && (
                    <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-60" />
                  )}
                </div>

                {/* Horizontal Synaptic Connector Line from Conduit to Card */}
                <div
                  className="absolute left-6 sm:left-10 top-11 -translate-y-1/2 w-6 sm:w-10 h-[2px] transition-all duration-300 z-10"
                  style={{
                    backgroundColor: item.color,
                    opacity: isHovered ? 1 : isPrimary ? 0.8 : 0.4,
                    boxShadow: isHovered ? `0 0 8px ${item.color}` : 'none',
                  }}
                />

                {/* Main Card Container */}
                <div
                  className={`relative rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
                    isPrimary
                      ? 'p-7 sm:p-9 bg-[#070e24]/90 border-2'
                      : 'p-6 sm:p-8 bg-[#050b1d]/75 border'
                  }`}
                  style={{
                    borderColor: isHovered
                      ? item.color
                      : isPrimary
                      ? 'rgba(0, 240, 255, 0.45)'
                      : 'rgba(56, 189, 248, 0.25)',
                    boxShadow: isHovered
                      ? `0 0 35px -5px ${item.glowColor}`
                      : isPrimary
                      ? '0 0 25px -8px rgba(0, 240, 255, 0.25)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Futuristic Scanline Effect on Primary Card */}
                  {isPrimary && (
                    <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />
                  )}

                  {/* Top Shimmer Beam on Primary Card */}
                  {isPrimary && (
                    <div
                      className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                      style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                    />
                  )}

                  {/* Corner Cyber Brackets */}
                  <div
                    className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? item.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? item.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? item.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? item.color : 'rgba(56, 189, 248, 0.3)' }}
                  />

                  {/* Card Header Info Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="p-2.5 rounded-xl border flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: `${item.color}15`,
                          borderColor: `${item.color}45`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                          ACADEMIC DEGREE
                        </span>
                        <span
                          className={`font-black tracking-tight ${
                            isPrimary
                              ? 'text-2xl sm:text-3xl text-white'
                              : 'text-xl sm:text-2xl text-slate-100'
                          }`}
                        >
                          {item.degree}
                        </span>
                      </div>
                    </div>

                    {/* Status Beacon / Hover Holographic Badge */}
                    <div className="flex items-center gap-2">
                      {isPrimary ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-semibold shadow-sm shadow-cyan-500/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                          </span>
                          <span>{isHovered ? item.hoverBadge : item.statusLabel}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isHovered ? item.hoverBadge : 'COMPLETED'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Field of Study (for B.Tech) */}
                  {item.field && (
                    <div className="mb-4">
                      <div className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-0.5">
                        SPECIALIZATION FIELD
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <span>{item.field}</span>
                        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                      </h3>
                    </div>
                  )}

                  {/* Institution Name */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-5">
                    <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1">
                      INSTITUTION
                    </div>
                    <div
                      className={`font-semibold text-slate-200 leading-snug ${
                        isPrimary ? 'text-base sm:text-lg text-white' : 'text-sm sm:text-base'
                      }`}
                    >
                      {item.institution}
                    </div>
                  </div>

                  {/* Footer Meta Grid: Stream, Duration, Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Stream */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between sm:justify-start sm:flex-col sm:items-start gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
                        <Layers className="w-3 h-3 text-cyan-400" />
                        <span>STREAM</span>
                      </div>
                      <span className="text-sm font-bold font-mono text-cyan-300">
                        {item.stream}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between sm:justify-start sm:flex-col sm:items-start gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>TIMEFRAME</span>
                      </div>
                      <span className="text-sm font-semibold font-mono text-slate-200">
                        {item.duration}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between sm:justify-start sm:flex-col sm:items-start gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>LOCATION</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-200">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Base Year Milestone: 2022 Origin ── */}
        <div className="relative flex items-center gap-4 pl-2 sm:pl-6 mt-10">
          <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-[#030712] border-2 border-slate-600 flex items-center justify-center shadow-md z-20">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold tracking-widest">
              2022
            </span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              GENESIS // HIGHER SECONDARY INITIATION
            </span>
          </div>
        </div>
      </div>

      {/* SVG Animation Keyframes */}
      <style>{`
        @keyframes pulseConduit {
          0% {
            top: 100%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 0%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
