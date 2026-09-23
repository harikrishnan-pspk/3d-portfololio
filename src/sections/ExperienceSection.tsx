import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Globe, Sparkles, Building2 } from 'lucide-react';

interface InternshipNode {
  id: string;
  title: string;
  organization: string;
  description: string;
  color: string;
  glowColor: string;
}

// 3D Tilt Card Component for smooth futuristic depth on hover
const TiltExperienceCard = ({
  exp,
  idx,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  exp: InternshipNode;
  idx: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="relative pl-12 sm:pl-20 group"
      style={{ perspective: 1000 }}
    >
      {/* Synaptic Node on the Vertical Conduit */}
      <div
        className="absolute left-6 sm:left-10 top-8 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#030712] border-2 flex items-center justify-center transition-all duration-300 z-20"
        style={{
          borderColor: exp.color,
          boxShadow: isHovered
            ? `0 0 24px 5px ${exp.glowColor}`
            : `0 0 14px 2px ${exp.glowColor}`,
        }}
      >
        <span
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-transform duration-300"
          style={{
            backgroundColor: isHovered ? '#ffffff' : exp.color,
            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          }}
        />
        {isHovered && (
          <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-60" />
        )}
      </div>

      {/* Horizontal Synaptic Connector Line from Conduit to Card */}
      <div
        className="absolute left-6 sm:left-10 top-11 -translate-y-1/2 w-6 sm:w-10 h-[2px] transition-all duration-300 z-10"
        style={{
          backgroundColor: exp.color,
          opacity: isHovered ? 1 : 0.6,
          boxShadow: isHovered ? `0 0 10px ${exp.color}` : 'none',
        }}
      />

      {/* 3D Tilt Card Wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={onHoverStart}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative p-7 sm:p-9 rounded-3xl bg-[#060c20]/85 border backdrop-blur-2xl transition-all duration-300 overflow-hidden shadow-xl cursor-default"
      >
        {/* Dynamic Card Border Glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
          style={{
            border: `1px solid ${exp.color}`,
            boxShadow: isHovered
              ? `0 0 35px -4px ${exp.glowColor}`
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
            opacity: isHovered ? 1 : 0.35,
          }}
        />

        {/* Futuristic Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

        {/* Top Shimmer Beam on Hover */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Corner Cyber Brackets */}
        <div
          className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? exp.color : 'rgba(56, 189, 248, 0.3)' }}
        />
        <div
          className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? exp.color : 'rgba(56, 189, 248, 0.3)' }}
        />
        <div
          className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? exp.color : 'rgba(56, 189, 248, 0.3)' }}
        />
        <div
          className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? exp.color : 'rgba(56, 189, 248, 0.3)' }}
        />

        {/* Card Header: ONLINE INTERNSHIP Badge with Subtle Cyan Glow */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80 relative z-10">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 border bg-cyan-500/10 border-cyan-400/35 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
            style={{
              borderColor: isHovered ? '#00f0ff' : 'rgba(0, 240, 255, 0.35)',
              boxShadow: isHovered
                ? '0 0 16px rgba(0, 240, 255, 0.5)'
                : '0 0 10px rgba(0, 240, 255, 0.2)',
            }}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>ONLINE INTERNSHIP</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-slate-500">
            <span>EXP_NODE_0{idx + 1}</span>
          </div>
        </div>

        {/* Role Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors relative z-10">
          {exp.title}
        </h3>

        {/* Organization Name */}
        <div className="flex items-center gap-2 mb-4 text-cyan-300 font-medium text-sm sm:text-base relative z-10">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span>{exp.organization}</span>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
          {exp.description}
        </p>

        {/* Card Bottom Meta */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500 relative z-10">
          <span className="text-[11px] uppercase tracking-wider text-slate-400">
            VERIFIED INTERNSHIP RECORD
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const internships: InternshipNode[] = [
    {
      id: 'internship-01',
      title: 'Frontend Development Intern',
      organization: 'CodeAlpha',
      description:
        'Frontend development internship focused on building and improving web interfaces.',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.45)',
    },
    {
      id: 'internship-02',
      title: 'Artificial Intelligence Intern',
      organization: 'Codec Technologies Pvt. Ltd.',
      description:
        'Artificial Intelligence internship focused on learning and working with AI concepts and applications.',
      color: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.45)',
    },
    {
      id: 'internship-03',
      title: 'ServiceNow Virtual Intern',
      organization: 'ServiceNow University / AICTE / SmartBridge',
      description:
        'Virtual internship focused on ServiceNow and related learning through the internship program.',
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Radial Glow Layers ── */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-start mb-16 sm:mb-20">
        {/* Status Indicator Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span>EXPERIENCE NODES //</span>
          <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            03
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          EXPERIENCE
        </h2>

        {/* Subtitle */}
        <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide mb-2">
          "Learning beyond the classroom."
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Applied practical learning tracks and virtual engineering engagements focused on modern frontend architecture, artificial intelligence fundamentals, and enterprise workflows.
        </p>
      </div>

      {/* ── Neural Experience Timeline ── */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Vertical Glowing Neural Conduit Line */}
        <div className="absolute left-6 sm:left-10 top-6 bottom-6 w-[2px]">
          {/* Base conduit track */}
          <div className="absolute inset-0 bg-slate-800/80" />

          {/* Active gradient conduit */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-500 to-sky-400 opacity-70 shadow-[0_0_12px_rgba(0,240,255,0.4)]" />

          {/* Continuous traveling photon energy pulse */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-90"
            style={{ animation: 'pulseConduit 4s ease-in-out infinite' }}
          />
        </div>

        {/* ── The 3 Internship Nodes ── */}
        <div className="space-y-10 sm:space-y-12">
          {internships.map((exp, idx) => (
            <TiltExperienceCard
              key={exp.id}
              exp={exp}
              idx={idx}
              isHovered={hoveredNode === exp.id}
              onHoverStart={() => setHoveredNode(exp.id)}
              onHoverEnd={() => setHoveredNode(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
