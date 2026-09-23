import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Code,
  Briefcase,
  Terminal,
  Database,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import {
  CERTIFICATES,
  CATEGORIES,
  CategoryId,
  Certificate,
} from './certificateData';

interface MobileNeuralPathwayProps {
  onSelectCertificate: (cert: Certificate) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain':
      return Brain;
    case 'Sparkles':
      return Sparkles;
    case 'Code':
      return Code;
    case 'Briefcase':
      return Briefcase;
    case 'Terminal':
      return Terminal;
    case 'Database':
      return Database;
    default:
      return Brain;
  }
};

export const MobileNeuralPathway = ({ onSelectCertificate }: MobileNeuralPathwayProps) => {
  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>('ai-ml');

  const toggleCategory = (catId: CategoryId) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  const categoryList = Object.values(CATEGORIES);

  return (
    <div className="relative w-full max-w-2xl mx-auto py-6 px-3">
      {/* ── Vertical Glowing Neural Conduit Line ── */}
      <div className="absolute left-8 sm:left-10 top-16 bottom-10 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-500 to-purple-600 opacity-40" />

      {/* ── Top Node: Knowledge Core ── */}
      <div className="relative flex items-center gap-4 mb-8 pl-1">
        <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-[#030712] border-2 border-cyan-400 p-3 shadow-lg shadow-cyan-500/30 flex items-center justify-center z-10">
          <Brain className="w-7 h-7 text-cyan-400 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full" />
        </div>

        <div>
          <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
            CENTRAL ROOT
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            KNOWLEDGE CORE
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Hari's Primary Synaptic Bus // 20 Nodes
          </p>
        </div>
      </div>

      {/* ── Category Branches along the Vertical Spine ── */}
      <div className="space-y-6">
        {categoryList.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.iconName);
          const isExpanded = expandedCategory === cat.id;
          const certsInCat = CERTIFICATES.filter((c) => c.categoryId === cat.id);

          return (
            <div key={cat.id} className="relative pl-1">
              {/* Branch Node Header */}
              <div className="flex items-start gap-4">
                {/* Branch Circle Node on the Spine */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="relative flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 z-10 focus:outline-none"
                  style={{
                    backgroundColor: isExpanded ? `${cat.color}25` : '#070e22',
                    borderColor: isExpanded ? cat.color : `${cat.color}50`,
                    boxShadow: isExpanded ? `0 0 16px ${cat.glowColor}` : 'none',
                  }}
                  aria-expanded={isExpanded}
                >
                  <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  <span
                    className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold text-white border"
                    style={{ backgroundColor: '#030712', borderColor: cat.color }}
                  >
                    {certsInCat.length}
                  </span>
                </button>

                {/* Category Card Header */}
                <div
                  onClick={() => toggleCategory(cat.id)}
                  className="flex-1 cursor-pointer p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">
                          BRANCH 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {certsInCat.length} NODES
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {cat.name}
                      </h4>
                    </div>

                    <div
                      className={`p-1.5 rounded-lg bg-slate-800/50 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 font-mono line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Expandable Certificates Accordion */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden ml-14 sm:ml-18 pt-3 space-y-2.5"
                  >
                    {certsInCat.map((cert) => (
                      <motion.div
                        key={cert.id}
                        onClick={() => onSelectCertificate(cert)}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer p-3.5 rounded-xl bg-[#09112a]/80 border border-cyan-500/25 hover:border-cyan-400 active:border-cyan-300 transition-all shadow-md group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-[9px] font-mono tracking-wider text-cyan-400 font-semibold uppercase">
                            {cert.memoryCode}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            COMPLETED
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                          {cert.title}
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                          <span className="font-medium text-slate-300">{cert.issuer}</span>
                          <span className="text-[10px] font-mono text-cyan-400 group-hover:underline">
                            INSPECT NODE →
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
