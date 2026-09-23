import { motion } from 'framer-motion';
import { 
  Code, 
  Layers, 
  Cpu, 
  GitBranch, 
  Sparkles, 
  BrainCircuit,
  Terminal,
  Box
} from 'lucide-react';

interface TechNode {
  name: string;
  category: string;
  tag: string;
}

export const SkillsSection = () => {
  const skillNodes: TechNode[] = [
    { name: 'HTML', category: 'Interface Core', tag: 'Semantic Markup' },
    { name: 'CSS', category: 'Interface Core', tag: 'Styling & Animations' },
    { name: 'JavaScript', category: 'Language Architecture', tag: 'ES6+ Logic' },
    { name: 'React', category: 'Interface Core', tag: 'Component Architecture' },
    { name: 'TypeScript', category: 'Language Architecture', tag: 'Type-Safe Systems' },
    { name: 'Git', category: 'Version Matrix', tag: 'Source Control' },
    { name: 'Python', category: 'Language Architecture', tag: 'Scripting & AI Core' },
    { name: 'AI/ML', category: 'Intelligence Layer', tag: 'Intelligent Models' },
    { name: 'Three.js', category: '3D / Graphics', tag: 'Interactive 3D Graphics' },
    { name: 'React Three Fiber', category: '3D / Graphics', tag: 'React-based 3D Interfaces' },
  ];

  const categories = [
    { name: 'Interface Core', icon: Layers, color: 'text-cyan-400' },
    { name: 'Language Architecture', icon: Code, color: 'text-blue-400' },
    { name: 'Version Matrix', icon: GitBranch, color: 'text-purple-400' },
    { name: 'Intelligence Layer', icon: Cpu, color: 'text-pink-400' },
    { name: '3D / Graphics', icon: Box, color: 'text-emerald-400' },
  ];

  return (
    <section id="skills" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Background soft ambient halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-3">
          <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
          <span>Neural Pathway // 02</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          NEURAL <span className="text-gradient-purple">PATHWAYS</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          The technical synapses and foundational technologies powering my cognitive and engineering stack.
        </p>
      </div>

      {/* Category Filter Pills (informative reference) */}
      <div className="flex flex-wrap items-center gap-3 mb-10 relative z-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300"
            >
              <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
              <span>{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* Interactive Technology Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        {skillNodes.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="group relative p-5 sm:p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md cursor-default overflow-hidden shadow-md"
          >
            {/* Synaptic line glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400/80 group-hover:scale-125 group-hover:bg-cyan-300 transition-all" />
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {tech.category}
                </span>
              </div>
              <Terminal className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors tracking-tight">
                {tech.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                {tech.tag}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500 relative z-10">
              <span>ACTIVE SYNAPSE</span>
              <Sparkles className="w-3 h-3 text-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
