import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen = ({ onLoaded }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL CORE...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const statusMessages = [
      'INITIALIZING NEURAL CORE...',
      'CALIBRATING SYNAPSE NETWORK...',
      'RENDERING CORTICAL STRUCTURES...',
      'SYNCHRONIZING RECEPTORS...',
      'NEURAL SYSTEM ONLINE',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const msgIdx = Math.min(
          Math.floor((next / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        setStatusText(statusMessages[msgIdx]);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            onLoaded?.();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white px-4"
        >
          {/* Subtle background radial glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
            {/* Holographic Pulse Ring */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full border border-purple-500/40 shadow-glow-cyan"
              />
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            {/* Neural System Status Text */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400/80 tracking-widest uppercase mb-1">
                <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                <span>{statusText}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-100">
                Inside Hari's Mind
              </h2>
            </div>

            {/* Cyber Progress Bar */}
            <div className="w-full bg-slate-950 border border-cyan-500/20 rounded-full h-2 overflow-hidden p-[1px] relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between w-full mt-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400/70">v1.0.0 [PROD]</span>
              <span className="text-cyan-300 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
