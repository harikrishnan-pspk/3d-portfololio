import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ContactSection } from './sections/ContactSection';
import { Terminal, Brain, ArrowUp } from 'lucide-react';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Loading Sequence */}
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      {/* Ambient Non-competing Background Layers */}
      <div className="fixed inset-0 cyber-grid opacity-25 pointer-events-none z-0" />
      <div className="fixed inset-0 neural-radial-gradient pointer-events-none z-0" />

      {/* Main Interface Content */}
      <div className={`relative z-10 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main className="relative">
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <AchievementsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Minimalist Futuristic Footer */}
        <footer className="relative z-10 border-t border-slate-900/90 bg-slate-950/80 backdrop-blur-md py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-semibold">Inside Hari's Mind</span>
                <span className="text-slate-500 ml-2">— Digital Brain Portfolio</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-slate-500">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Frontend Developer | CSE-AI</span>
              </div>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                title="Return to Core"
              >
                <span>Return to Core</span>
                <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
