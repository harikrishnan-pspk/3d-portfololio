import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2, Cpu, Sparkles, CheckCircle2, Terminal } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'Deployed';
  architectureNote: string;
}

export const ProjectsSection = () => {
  const project: ProjectItem = {
    id: 'resume-builder',
    title: 'Resume Builder',
    description:
      'A professional resume-building web application that helps users create, customize, and export structured resumes with a modern interface.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/harikrishnan-pspk/Resume_builder',
    liveUrl: 'https://resume-builder-mu-teal.vercel.app/',
    status: 'Deployed',
    architectureNote:
      'Component-driven layout engine with real-time state synchronization and client-side document compilation.',
  };

  return (
    <section id="projects" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden">
      {/* ── Ambient Radial Glow Layers ── */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-start mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Neural Pathway // 03</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          MEMORY VAULT // <span className="text-gradient-cyan">PROJECTS</span>
        </h2>
        <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide mb-2">
          "Engineered software architectures committed to production."
        </p>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Production applications designed with focused component hierarchies, resilient TypeScript typing, and responsive modern user experiences.
        </p>
      </div>

      {/* ── Full-Width Featured Project Card: Resume Builder ── */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-7 sm:p-10 lg:p-12 rounded-3xl bg-[#060c20]/90 border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 shadow-2xl shadow-cyan-950/40 overflow-hidden group backdrop-blur-2xl"
        >
          {/* Futuristic Scanline Effect */}
          <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

          {/* Top Shimmer Beam */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
            style={{ animation: 'shimmer 3s ease-in-out infinite' }}
          />

          {/* Corner Cyber Brackets */}
          <div className="pointer-events-none absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/70" />
          <div className="pointer-events-none absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/70" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/70" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/70" />

          {/* Subtle Ambient Hover Orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm shadow-cyan-500/10">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>FEATURED PROJECT</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>LIVE SYSTEM // DEPLOYED</span>
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-300 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-200 hover:scale-[1.02]"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-medium text-sm transition-all duration-200"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>

            {/* Right Telemetry Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Architecture Node Display */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-center relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-inner">
                    <Cpu className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      SYSTEM TELEMETRY
                    </span>
                    <h4 className="text-white font-bold text-base sm:text-lg">
                      Architecture Node
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed mb-4">
                  {project.architectureNote}
                </p>

                {/* Sub-telemetry indicators */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">CLIENT ENGINE</span>
                    <span className="text-cyan-300 font-semibold">Vite + React</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">TYPE RIGOR</span>
                    <span className="text-emerald-400 font-semibold">Strict TypeScript</span>
                  </div>
                </div>
              </div>

              {/* Deployment Status Pill */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PRODUCTION HOSTING</span>
                </div>
                <span className="text-cyan-300 font-semibold">Vercel Edge Network</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
