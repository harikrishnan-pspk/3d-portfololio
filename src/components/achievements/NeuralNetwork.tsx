import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Info } from 'lucide-react';
import {
  CERTIFICATES,
  CATEGORIES,
  CategoryId,
  Certificate,
} from './certificateData';

interface NeuralNetworkProps {
  onSelectCertificate: (cert: Certificate) => void;
}

interface NodeCoord {
  x: number;
  y: number;
}

// Hub Positions in 1000 x 680 SVG space
const CORE_COORD: NodeCoord = { x: 500, y: 340 };

const CATEGORY_COORDS: Record<CategoryId, NodeCoord> = {
  'ai-ml': { x: 500, y: 140 },
  'genai-prompting': { x: 740, y: 220 },
  'software-dev': { x: 730, y: 460 },
  'data-entrepreneurship': { x: 500, y: 535 },
  'job-simulations': { x: 270, y: 460 },
  'internships': { x: 260, y: 220 },
};

// Certificate Node Specific Coordinates (spread out evenly in pleasant orbital arcs)
const CERT_COORDS: Record<number, NodeCoord> = {
  // AI & ML (5)
  1: { x: 380, y: 65 },  // AWS Art of the Possible
  2: { x: 440, y: 45 },  // AWS ML Decision Makers
  6: { x: 500, y: 40 },  // Oracle Agentic AI
  7: { x: 560, y: 45 },  // Infosys Generative AI
  12: { x: 620, y: 65 }, // Microsoft AI in Manufacturing

  // Generative AI & Prompting (6)
  3: { x: 805, y: 105 }, // IBM Craft Precise Prompts
  11: { x: 875, y: 140 }, // Google Cloud Gemini
  17: { x: 925, y: 195 }, // Anthropic AI Fluency
  18: { x: 935, y: 255 }, // Anthropic Claude Cowork
  19: { x: 890, y: 310 }, // Anthropic Claude 101
  20: { x: 825, y: 345 }, // LinkedIn Learning Gen AI

  // Software & Development (4)
  10: { x: 835, y: 415 }, // CodeAlpha Frontend
  15: { x: 895, y: 465 }, // Scaler JavaScript
  13: { x: 885, y: 535 }, // Walmart Software Eng
  14: { x: 820, y: 585 }, // Automation Anywhere

  // Data & Entrepreneurship (1)
  16: { x: 500, y: 625 }, // E-SDP Data Science

  // Job Simulations (2)
  4: { x: 165, y: 440 }, // Tata GenAI Data Analytics
  5: { x: 180, y: 525 }, // Tata Cybersecurity IAM

  // Internships (2)
  9: { x: 155, y: 180 }, // Codec Technologies AI Intern
  8: { x: 175, y: 265 }, // ServiceNow Virtual Internship
};

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ onSelectCertificate }) => {
  const [hoveredCert, setHoveredCert] = useState<Certificate | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryId | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryId | 'all'>('all');

  // SVG Bezier curved pathways
  const hubPaths = useMemo(() => {
    return Object.entries(CATEGORY_COORDS).map(([catId, coord]) => {
      const dx = coord.x - CORE_COORD.x;
      const dy = coord.y - CORE_COORD.y;
      // Midpoint with slight organic curvature
      const cx = CORE_COORD.x + dx * 0.5 - dy * 0.1;
      const cy = CORE_COORD.y + dy * 0.5 + dx * 0.1;
      return {
        catId: catId as CategoryId,
        path: `M ${CORE_COORD.x} ${CORE_COORD.y} Q ${cx} ${cy} ${coord.x} ${coord.y}`,
        dest: coord,
      };
    });
  }, []);

  // Synaptic lines from category hubs to certificate nodes
  const certLines = useMemo(() => {
    return CERTIFICATES.map((cert) => {
      const hubCoord = CATEGORY_COORDS[cert.categoryId];
      const certCoord = CERT_COORDS[cert.id] || hubCoord;
      const dx = certCoord.x - hubCoord.x;
      const dy = certCoord.y - hubCoord.y;
      const cx = hubCoord.x + dx * 0.5 - dy * 0.08;
      const cy = hubCoord.y + dy * 0.5 + dx * 0.08;
      return {
        cert,
        path: `M ${hubCoord.x} ${hubCoord.y} Q ${cx} ${cy} ${certCoord.x} ${certCoord.y}`,
        coord: certCoord,
      };
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#030712]/70 border border-cyan-500/20 backdrop-blur-xl p-3 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-950/30">
      {/* Interactive Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>NEURAL TOPOLOGY // INTERACTIVE MATRIX</span>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
              activeCategoryFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            All Nodes (20)
          </button>
          {Object.values(CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id === activeCategoryFilter ? 'all' : cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                activeCategoryFilter === cat.id
                  ? 'text-white border shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
              style={
                activeCategoryFilter === cat.id
                  ? {
                      backgroundColor: `${cat.color}25`,
                      borderColor: `${cat.color}70`,
                      boxShadow: `0 0 12px ${cat.glowColor}`,
                    }
                  : {}
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main SVG Neural Network Graph */}
      <div className="relative w-full aspect-[1000/680] max-h-[720px] select-none">
        <svg
          viewBox="0 0 1000 680"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.05))' }}
        >
          <defs>
            {/* Cyan Energy Pulse Gradient */}
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>

            {/* Glowing Filter Definitions */}
            <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Background Grid & Orbit Rings ── */}
          <circle
            cx={CORE_COORD.x}
            cy={CORE_COORD.y}
            r="230"
            fill="none"
            stroke="rgba(56, 189, 248, 0.08)"
            strokeDasharray="4 8"
          />
          <circle
            cx={CORE_COORD.x}
            cy={CORE_COORD.y}
            r="320"
            fill="none"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeDasharray="2 12"
          />

          {/* ── Level 1: Pathways from Knowledge Core to Category Hubs ── */}
          {hubPaths.map(({ catId, path }) => {
            const isCatActive =
              activeCategoryFilter === 'all' || activeCategoryFilter === catId;
            const isHovered =
              hoveredCategory === catId || (hoveredCert && hoveredCert.categoryId === catId);
            const category = CATEGORIES[catId];

            return (
              <g key={`hub-path-${catId}`}>
                {/* Background base path */}
                <path
                  d={path}
                  fill="none"
                  stroke={isCatActive ? category.color : '#1e293b'}
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  strokeOpacity={isHovered ? 0.9 : isCatActive ? 0.35 : 0.1}
                  className="transition-all duration-300"
                />

                {/* Animated traveling energy pulse */}
                {isCatActive && (
                  <path
                    d={path}
                    fill="none"
                    stroke={category.color}
                    strokeWidth={isHovered ? 3 : 2}
                    strokeDasharray="12 180"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    style={{
                      animation: 'dashPulse 3.5s linear infinite',
                      opacity: isHovered ? 1 : 0.7,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* ── Level 2: Pathways from Category Hubs to Certificate Nodes ── */}
          {certLines.map(({ cert, path }) => {
            const category = CATEGORIES[cert.categoryId];
            const isCertActive =
              activeCategoryFilter === 'all' || activeCategoryFilter === cert.categoryId;
            const isHovered = hoveredCert?.id === cert.id;

            return (
              <g key={`cert-line-${cert.id}`}>
                <path
                  d={path}
                  fill="none"
                  stroke={isCertActive ? category.color : '#1e293b'}
                  strokeWidth={isHovered ? 2.2 : 0.9}
                  strokeOpacity={isHovered ? 0.95 : isCertActive ? 0.3 : 0.08}
                  className="transition-all duration-300"
                />

                {/* Subtle pulse if hovered */}
                {isHovered && (
                  <circle r="3" fill="#ffffff" filter="url(#nodeGlow)">
                    <animateMotion path={path} dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* ── Category Hubs (Middle Ring) ── */}
          {Object.entries(CATEGORY_COORDS).map(([catId, coord]) => {
            const cat = CATEGORIES[catId as CategoryId];
            const isCatActive =
              activeCategoryFilter === 'all' || activeCategoryFilter === catId;
            const isHovered =
              hoveredCategory === catId || (hoveredCert && hoveredCert.categoryId === catId);

            return (
              <g
                key={`cat-hub-${catId}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer transition-transform duration-300"
                onMouseEnter={() => setHoveredCategory(catId as CategoryId)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() =>
                  setActiveCategoryFilter(activeCategoryFilter === catId ? 'all' : (catId as CategoryId))
                }
              >
                {/* Hub Pulsing Ring */}
                <circle
                  r={isHovered ? 26 : 22}
                  fill={cat.color}
                  fillOpacity={isHovered ? 0.25 : 0.1}
                  stroke={cat.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isCatActive ? 0.8 : 0.3}
                  filter={isHovered ? 'url(#nodeGlow)' : undefined}
                />

                {/* Hub Center Disc */}
                <circle
                  r={isHovered ? 14 : 11}
                  fill="#030712"
                  stroke={cat.color}
                  strokeWidth={1.8}
                />

                {/* Core Dot */}
                <circle r={isHovered ? 5 : 3.5} fill={cat.color} />

                {/* Category Label */}
                <text
                  y={coord.y > CORE_COORD.y ? 34 : -30}
                  textAnchor="middle"
                  className="text-[10px] font-mono tracking-widest font-semibold fill-slate-300"
                  style={{
                    fill: isHovered || isCatActive ? '#ffffff' : '#64748b',
                    fontSize: isHovered ? '11px' : '9.5px',
                  }}
                >
                  {cat.shortName}
                </text>
              </g>
            );
          })}

          {/* ── Certificate Nodes (Outer Constellation) ── */}
          {certLines.map(({ cert, coord }) => {
            const category = CATEGORIES[cert.categoryId];
            const isCertActive =
              activeCategoryFilter === 'all' || activeCategoryFilter === cert.categoryId;
            const isHovered = hoveredCert?.id === cert.id;

            return (
              <g
                key={`cert-node-${cert.id}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCert(cert)}
                onMouseLeave={() => setHoveredCert(null)}
                onClick={() => onSelectCertificate(cert)}
              >
                {/* Expanded Click/Hit area */}
                <circle r="22" fill="transparent" />

                {/* Outer Glow Ring on Hover */}
                {isHovered && (
                  <circle
                    r="18"
                    fill="none"
                    stroke={category.color}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-spin"
                    style={{ transformOrigin: '0 0', animationDuration: '6s' }}
                  />
                )}

                {/* Breathing Outer Shell */}
                <circle
                  r={isHovered ? 14 : 9}
                  fill={category.color}
                  fillOpacity={isHovered ? 0.35 : isCertActive ? 0.18 : 0.05}
                  stroke={category.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 1 : isCertActive ? 0.7 : 0.2}
                  filter={isHovered ? 'url(#nodeGlow)' : undefined}
                  className="transition-all duration-200"
                />

                {/* Node Solid Center */}
                <circle
                  r={isHovered ? 7 : 4}
                  fill={isHovered ? '#ffffff' : isCertActive ? category.color : '#334155'}
                  className="transition-all duration-200"
                />

                {/* Subtle ID number */}
                <text
                  y="20"
                  textAnchor="middle"
                  className="text-[8px] font-mono fill-slate-400 select-none pointer-events-none"
                  style={{
                    fill: isHovered ? '#ffffff' : isCertActive ? category.color : '#475569',
                    fontWeight: isHovered ? 700 : 400,
                  }}
                >
                  {cert.id < 10 ? `0${cert.id}` : cert.id}
                </text>
              </g>
            );
          })}

          {/* ── Central Knowledge Core (Center Hub) ── */}
          <g
            transform={`translate(${CORE_COORD.x}, ${CORE_COORD.y})`}
            className="cursor-default"
          >
            {/* Deep Ambient Core Aura */}
            <circle
              r="62"
              fill="rgba(0, 240, 255, 0.05)"
              stroke="rgba(0, 240, 255, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin"
              style={{ transformOrigin: '0 0', animationDuration: '30s' }}
            />

            {/* Concentric Middle Ring */}
            <circle
              r="48"
              fill="rgba(3, 7, 18, 0.9)"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="1.5"
            />

            {/* Rotating Cyber Markings */}
            <circle
              r="40"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeDasharray="6 28"
              className="animate-spin"
              style={{ transformOrigin: '0 0', animationDuration: '14s' }}
            />

            {/* Core Center Disk */}
            <circle
              r="28"
              fill="#07122b"
              stroke="#00f0ff"
              strokeWidth="2"
              filter="url(#coreGlow)"
            />

            {/* Knowledge Core Inner Icon */}
            <circle r="12" fill="#00f0ff" fillOpacity="0.8" />
            <circle r="5" fill="#ffffff" />

            {/* Knowledge Core Typography */}
            <text
              y="74"
              textAnchor="middle"
              className="text-[10px] font-mono font-bold tracking-[0.25em] fill-cyan-300 uppercase"
            >
              KNOWLEDGE CORE
            </text>
            <text
              y="86"
              textAnchor="middle"
              className="text-[8px] font-mono tracking-widest fill-slate-500 uppercase"
            >
              HARI'S SYNAPSE ENGINE
            </text>
          </g>
        </svg>

        {/* ── Floating Holographic Tooltip on Hover ── */}
        <AnimatePresence>
          {hoveredCert && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md w-[90%] p-4 rounded-xl bg-[#070e24]/95 border border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-950/60 z-30"
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg border flex-shrink-0"
                  style={{
                    backgroundColor: `${CATEGORIES[hoveredCert.categoryId].color}20`,
                    borderColor: `${CATEGORIES[hoveredCert.categoryId].color}60`,
                  }}
                >
                  <Award
                    className="w-5 h-5"
                    style={{ color: CATEGORIES[hoveredCert.categoryId].color }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-mono tracking-wider text-cyan-400 font-semibold uppercase">
                      {CATEGORIES[hoveredCert.categoryId].name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      CLICK TO INSPECT NODE
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {hoveredCert.title}
                  </div>

                  <div className="text-xs text-slate-300 font-medium mt-1">
                    {hoveredCert.issuer}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Tip */}
      <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Select any node or category to inspect verified credentials</span>
        </div>
        <div className="text-slate-500 text-[11px]">
          ACTIVE NEURAL CONSTELLATION // 20 MEMORY CELLS
        </div>
      </div>

      {/* SVG Animation Keyframes */}
      <style>{`
        @keyframes dashPulse {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
