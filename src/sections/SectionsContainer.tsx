import { BrainCircuit } from 'lucide-react';

interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
}

const sections: SectionConfig[] = [
  { id: 'about', title: 'About Mind', subtitle: 'Neural Identity & Philosophy' },
  { id: 'skills', title: 'Neural Pathways', subtitle: 'Technical Core & Specializations' },
  { id: 'projects', title: 'Memory Vault', subtitle: 'Architectures & Engineered Systems' },
  { id: 'education', title: 'Synaptic Foundation', subtitle: 'Academic & AI Journey' },
  { id: 'achievements', title: 'Milestones', subtitle: 'Recognitions & Breakthroughs' },
  { id: 'experience', title: 'Timeline Trace', subtitle: 'Professional Trajectory' },
  { id: 'contact', title: 'Neural Transmission', subtitle: 'Establish Uplink' },
];

export const SectionsContainer = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 p-8 sm:p-12 rounded-3xl glass-panel glass-panel-hover border border-slate-800/80 relative overflow-hidden group"
        >
          {/* Subtle glowing accent gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>Section Module // {section.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {section.title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                {section.subtitle}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs font-mono text-slate-400 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
              <span>Foundation Ready for Module Ingestion</span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
