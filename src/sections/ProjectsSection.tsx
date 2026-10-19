import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  FolderGit2,
  Cpu,
  Sparkles,
  CheckCircle2,
  Terminal,
  Code2,
  Bot,
} from 'lucide-react';

interface ProjectItem {
  id: string;
  badgeNumber: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: string;
  accent: 'purple' | 'cyan';
  architectureNote: string;
  telemetry: {
    clientLabel: string;
    clientValue: string;
    backendLabel: string;
    backendValue: string;
    hostingLabel: string;
    hostingValue: string;
  };
  visualType: 'compiler' | 'architecture';
}

const projects: ProjectItem[] = [
  {
    id: 'codeforge',
    badgeNumber: 'FEATURED PROJECT // 01',
    title: 'CodeForge — Online Compiler',
    description:
      'An online coding platform that lets users write and execute code in multiple programming languages, view execution errors, and use AI-assisted error fixing.',
    tags: [
      'React',
      'TypeScript',
      'Monaco Editor',
      'FastAPI',
      'Python',
      'Gemini AI',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/harikrishnan-pspk/online-compiler',
    liveUrl: 'https://online-compiler-peach.vercel.app/',
    status: 'LIVE SYSTEM // DEPLOYED',
    accent: 'purple',
    architectureNote:
      'Full-stack multi-language compilation engine with isolated execution environments, WebSocket streaming, and AI-assisted error diagnostics.',
    telemetry: {
      clientLabel: 'FRONTEND ENGINE',
      clientValue: 'React + Monaco Editor',
      backendLabel: 'BACKEND CORE',
      backendValue: 'FastAPI + Python',
      hostingLabel: 'AI DIAGNOSTICS',
      hostingValue: 'Google Gemini Model',
    },
    visualType: 'compiler',
  },
  {
    id: 'resume-builder',
    badgeNumber: 'FEATURED PROJECT // 02',
    title: 'Resume Builder',
    description:
      'A professional resume-building web application that helps users create, customize, and export structured resumes with a modern interface.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/harikrishnan-pspk/Resume_builder',
    liveUrl: 'https://resume-builder-mu-teal.vercel.app/',
    status: 'LIVE SYSTEM // DEPLOYED',
    accent: 'cyan',
    architectureNote:
      'Component-driven layout engine with real-time state synchronization and client-side document compilation.',
    telemetry: {
      clientLabel: 'CLIENT ENGINE',
      clientValue: 'Vite + React',
      backendLabel: 'TYPE RIGOR',
      backendValue: 'Strict TypeScript',
      hostingLabel: 'PRODUCTION HOSTING',
      hostingValue: 'Vercel Edge Network',
    },
    visualType: 'architecture',
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Radial Glow Layers ── */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 w-[550px] h-[350px] bg-purple-500/5 rounded-full blur-3xl z-0" />

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

      {/* ── Featured Projects List ── */}
      <div className="relative z-10 flex flex-col gap-10 lg:gap-12">
        {projects.map((project, index) => {
          const isPurple = project.accent === 'purple';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-7 sm:p-10 lg:p-12 rounded-3xl bg-[#060c20]/90 border transition-all duration-300 shadow-2xl overflow-hidden group backdrop-blur-2xl ${
                isPurple
                  ? 'border-purple-500/35 hover:border-purple-400/60 shadow-purple-950/40'
                  : 'border-cyan-500/35 hover:border-cyan-400/60 shadow-cyan-950/40'
              }`}
            >
              {/* Futuristic Scanline Effect */}
              <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

              {/* Top Shimmer Beam */}
              <div
                className={`pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${
                  isPurple ? 'via-purple-400/80' : 'via-cyan-400/80'
                } to-transparent`}
                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
              />

              {/* Corner Cyber Brackets */}
              <div
                className={`pointer-events-none absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 ${
                  isPurple ? 'border-purple-400/70' : 'border-cyan-400/70'
                }`}
              />
              <div
                className={`pointer-events-none absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 ${
                  isPurple ? 'border-purple-400/70' : 'border-cyan-400/70'
                }`}
              />
              <div
                className={`pointer-events-none absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 ${
                  isPurple ? 'border-purple-400/70' : 'border-cyan-400/70'
                }`}
              />
              <div
                className={`pointer-events-none absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 ${
                  isPurple ? 'border-purple-400/70' : 'border-cyan-400/70'
                }`}
              />

              {/* Subtle Ambient Hover Orb */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all ${
                  isPurple
                    ? 'bg-purple-500/10 group-hover:bg-purple-500/20'
                    : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
                }`}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Content Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Status Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
                          isPurple
                            ? 'bg-purple-500/15 border border-purple-400/40 text-purple-300 shadow-purple-500/10'
                            : 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-cyan-500/10'
                        }`}
                      >
                        <Sparkles
                          className={`w-3.5 h-3.5 ${
                            isPurple ? 'text-purple-400' : 'text-cyan-400'
                          }`}
                        />
                        <span>{project.badgeNumber}</span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{project.status}</span>
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight transition-colors ${
                        isPurple
                          ? 'group-hover:text-purple-200'
                          : 'group-hover:text-cyan-200'
                      }`}
                    >
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
                          className={`px-3 py-1.5 rounded-xl bg-slate-900/90 border text-xs font-mono shadow-sm ${
                            isPurple
                              ? 'border-slate-800 text-purple-300'
                              : 'border-slate-800 text-cyan-300'
                          }`}
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
                      className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-200 hover:scale-[1.02] text-slate-950 ${
                        isPurple
                          ? 'bg-gradient-to-r from-purple-400 via-sky-400 to-cyan-300 hover:from-purple-300 hover:to-cyan-200 shadow-purple-500/25 hover:shadow-cyan-400/40'
                          : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-cyan-500/25 hover:shadow-cyan-400/40'
                      }`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900/90 border text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 ${
                        isPurple
                          ? 'border-slate-700 hover:border-purple-400'
                          : 'border-slate-700 hover:border-cyan-400'
                      }`}
                    >
                      <Github
                        className={`w-4 h-4 ${
                          isPurple ? 'text-purple-400' : 'text-cyan-400'
                        }`}
                      />
                      <span>View Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Right Telemetry Column (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {project.visualType === 'compiler' ? (
                    <>
                      {/* Futuristic Compiler Visual */}
                      <div className="rounded-2xl bg-slate-950/90 border border-purple-500/30 overflow-hidden shadow-xl shadow-purple-950/30">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <span className="text-slate-400 ml-1.5 flex items-center gap-1.5 text-[11px]">
                              <Code2 className="w-3.5 h-3.5 text-purple-400" />
                              <span>compiler_engine.py</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] text-purple-300">
                            <Bot className="w-3 h-3 text-purple-400" />
                            <span>AI Assist Active</span>
                          </div>
                        </div>

                        {/* Code Stream Lines */}
                        <div className="p-3.5 font-mono text-[11px] leading-relaxed space-y-1 bg-[#040816]/95 text-slate-300">
                          <div className="text-slate-500 text-[10px]">
                            // Real-time compilation &amp; AI diagnostics
                          </div>
                          <div>
                            <span className="text-purple-400">async def</span>{' '}
                            <span className="text-cyan-300">execute_code</span>(lang:{' '}
                            <span className="text-amber-300">str</span>, source:{' '}
                            <span className="text-amber-300">str</span>):
                          </div>
                          <div className="pl-3.5 text-slate-400">
                            executor ={' '}
                            <span className="text-cyan-400">CompilerRegistry</span>
                            .get(lang)
                          </div>
                          <div className="pl-3.5 text-slate-400">
                            result = <span className="text-purple-400">await</span>{' '}
                            executor.<span className="text-cyan-300">run</span>(source)
                          </div>
                          <div className="pl-3.5 text-purple-300">
                            <span className="text-purple-400">if</span>{' '}
                            result.<span className="text-rose-400">has_error</span>:
                          </div>
                          <div className="pl-7 text-cyan-300">
                            <span className="text-purple-400">return</span>{' '}
                            <span className="text-purple-300">GeminiAI</span>
                            .analyze_fix(result.err)
                          </div>
                          <div className="pl-3.5 text-emerald-400">
                            <span className="text-purple-400">return</span>{' '}
                            result.<span className="text-emerald-300">stdout</span>
                          </div>
                        </div>

                        {/* Compiler Status Output Tray */}
                        <div className="px-3.5 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Execution Success (Exit 0)</span>
                          </div>
                          <span className="text-slate-400">
                            Python • C++ • Java • JS
                          </span>
                        </div>
                      </div>

                      {/* System Telemetry & Architecture Node */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                            <Cpu className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                              SYSTEM TELEMETRY
                            </span>
                            <h4 className="text-white font-bold text-sm sm:text-base">
                              Architecture Node
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-mono leading-relaxed">
                          {project.architectureNote}
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 text-xs font-mono pt-1">
                          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block uppercase">
                              {project.telemetry.clientLabel}
                            </span>
                            <span className="text-cyan-300 font-semibold text-[11px]">
                              {project.telemetry.clientValue}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block uppercase">
                              {project.telemetry.backendLabel}
                            </span>
                            <span className="text-purple-300 font-semibold text-[11px]">
                              {project.telemetry.backendValue}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Terminal className="w-3.5 h-3.5 text-purple-400" />
                            <span>{project.telemetry.hostingLabel}</span>
                          </div>
                          <span className="text-purple-300 font-semibold text-[11px]">
                            {project.telemetry.hostingValue}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Architecture Node Display for Resume Builder */}
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
                            <span className="text-[10px] text-slate-500 block uppercase">
                              {project.telemetry.clientLabel}
                            </span>
                            <span className="text-cyan-300 font-semibold">
                              {project.telemetry.clientValue}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block uppercase">
                              {project.telemetry.backendLabel}
                            </span>
                            <span className="text-emerald-400 font-semibold">
                              {project.telemetry.backendValue}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Deployment Status Pill */}
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{project.telemetry.hostingLabel}</span>
                        </div>
                        <span className="text-cyan-300 font-semibold">
                          {project.telemetry.hostingValue}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

