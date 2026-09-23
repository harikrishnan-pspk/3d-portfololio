import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { Certificate, CATEGORIES } from './certificateData';

interface CertificateDetailProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateDetail = ({ certificate, onClose }: CertificateDetailProps) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const category = CATEGORIES[certificate.categoryId];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Holographic backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md transition-opacity"
        />

        {/* Holographic Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#070d1e]/90 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 p-6 sm:p-8 z-10"
        >
          {/* Futuristic Scanline Effect */}
          <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />

          {/* Holographic Moving Light Beam across top border */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
            style={{ animation: 'shimmer 3s ease-in-out infinite' }}
          />

          {/* Corner Cyber Brackets */}
          <div className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80" />
          <div className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80" />
          <div className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80" />
          <div className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80" />

          {/* Card Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 font-semibold uppercase">
                CERTIFICATION NODE
              </span>
              <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                [{certificate.memoryCode}]
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none"
              aria-label="Close details"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition-colors" />
            </button>
          </div>

          {/* Main Card Content */}
          <div className="space-y-6">
            {/* Certificate Icon & Category */}
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl border flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: `${category.color}15`,
                  borderColor: `${category.color}50`,
                  boxShadow: `0 0 20px -5px ${category.glowColor}`,
                }}
              >
                <Award className="w-7 h-7" style={{ color: category.color }} />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                  BRANCH REPOSITORY
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Cpu className="w-3.5 h-3.5" style={{ color: category.color }} />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {category.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.18em] text-cyan-400 uppercase mb-1.5">
                CERTIFICATION
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {certificate.title}
              </h3>
            </div>

            {/* Issued By */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono tracking-[0.18em] text-slate-400 uppercase mb-1">
                ISSUED BY
              </div>
              <div className="text-sm sm:text-base font-semibold text-cyan-300">
                {certificate.issuer}
              </div>
            </div>

            {/* Status Information */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/25">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
                  STATUS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>COMPLETED</span>
              </div>
            </div>

            {/* Action Button: Close Node */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 hover:from-cyan-500/30 hover:via-blue-500/30 hover:to-cyan-500/30 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white font-mono text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/20"
              >
                [ CLOSE NODE ]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
