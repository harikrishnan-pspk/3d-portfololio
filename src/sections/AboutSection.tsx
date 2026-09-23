import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Code2,
  Brain,
  Compass,
  Sparkles,
} from 'lucide-react';

interface AboutNode {
  id: string;
  nodeNumber: string;
  nodeCategory: string;
  title: string;
  content: string;
  icon: typeof User;
  color: string;
  glowColor: string;
}

export const AboutSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const aboutNodes: AboutNode[] = [
    {
      id: 'who-i-am',
      nodeNumber: 'NODE // 01',
      nodeCategory: 'IDENTITY',
      title: 'Who I Am',
      content:
        "I'm a CSE-AI student and aspiring Frontend Developer who enjoys turning ideas into interactive and user-friendly digital experiences.",
      icon: User,
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.45)',
    },
    {
      id: 'what-i-build',
      nodeNumber: 'NODE // 02',
      nodeCategory: 'BUILD SYSTEM',
      title: 'What I Build',
      content:
        'I build modern web applications with React and TypeScript, combining clean interfaces with creative interactions and practical functionality.',
      icon: Code2,
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
    },
    {
      id: 'currently-exploring',
      nodeNumber: 'NODE // 03',
      nodeCategory: 'LEARNING PATH',
      title: 'Currently Exploring',
      content:
        "I'm expanding my skills in Artificial Intelligence, React, JavaScript, Three.js, and modern web development while building projects that challenge my creativity.",
      icon: Brain,
      color: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.45)',
    },
    {
      id: 'my-direction',
      nodeNumber: 'NODE // 04',
      nodeCategory: 'FUTURE PATH',
      title: 'My Direction',
      content:
        'My goal is to grow as a developer by combining frontend engineering and AI to create useful, intelligent, and engaging digital experiences.',
      icon: Compass,
      color: '#34d399',
      glowColor: 'rgba(52, 211, 153, 0.45)',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Radial Glow Layers ── */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-[500px] h-[350px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-start mb-14 sm:mb-18">
        {/* Status Indicator Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROFILE NODE //</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            ACTIVE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          ABOUT THE <span className="text-gradient-cyan">MIND</span>
        </h2>

        {/* Subtitle */}
        <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide mb-2">
          "Understanding the person behind the projects."
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          A glimpse into the neural core of my work—connecting who I am, what I build, what I'm actively exploring, and where I'm headed next.
        </p>
      </div>

      {/* ── 2x2 Interactive Neural Card Matrix ── */}
      <div className="relative z-10">
        {/* Central Cross Neural Junction Lines (Visible on Desktop / Tablet) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="verticalSynapse" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="horizontalSynapse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Vertical midline connecting top & bottom cards */}
            <line
              x1="50%"
              y1="5%"
              x2="50%"
              y2="95%"
              stroke="url(#verticalSynapse)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.5"
            />

            {/* Horizontal midline connecting left & right cards */}
            <line
              x1="5%"
              y1="50%"
              x2="95%"
              y2="50%"
              stroke="url(#horizontalSynapse)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.5"
            />

            {/* Central glowing nexus hub */}
            <circle cx="50%" cy="50%" r="8" fill="#030712" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="50%" cy="50%" r="3" fill="#00f0ff" className="animate-pulse" />
          </svg>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          {aboutNodes.map((node, idx) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="relative rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 group"
              >
                {/* Main Card Panel */}
                <div
                  className="h-full p-7 sm:p-9 rounded-3xl bg-[#060c20]/85 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.22)',
                    boxShadow: isHovered
                      ? `0 0 30px -4px ${node.glowColor}`
                      : '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Futuristic Scanline Effect */}
                  <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

                  {/* Top Ambient Glow Pill */}
                  <div
                    className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300"
                    style={{
                      backgroundColor: node.color,
                      opacity: isHovered ? 0.25 : 0.08,
                    }}
                  />

                  {/* Corner Cyber Brackets */}
                  <div
                    className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.3)' }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300"
                    style={{ borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.3)' }}
                  />

                  {/* Card Header: Icon + Title */}
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div
                        className="p-3 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-md"
                        style={{
                          backgroundColor: `${node.color}15`,
                          borderColor: isHovered ? node.color : `${node.color}40`,
                          boxShadow: isHovered ? `0 0 16px ${node.glowColor}` : 'none',
                        }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: node.color }} />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                        {node.title}
                      </h3>
                    </div>

                    {/* Card Content Text */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
                      {node.content}
                    </p>
                  </div>

                  {/* Card Bottom Meta Bar: NODE // XX + Label */}
                  <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor: node.color,
                          transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                      <span className="text-slate-400 group-hover:text-cyan-300 transition-colors font-semibold">
                        {node.nodeNumber}
                      </span>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded-md font-semibold tracking-wider transition-all duration-300 border"
                      style={{
                        backgroundColor: `${node.color}12`,
                        borderColor: `${node.color}35`,
                        color: node.color,
                      }}
                    >
                      {node.nodeCategory}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
