import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-cyan-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
          onClick={() => setActiveSection('home')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all duration-300">
            <Brain className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Hari's Mind
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-80" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Digital Brain OS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.label.toLowerCase();
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.label.toLowerCase())}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Button */}
        <div className="flex items-center gap-3 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/25 text-slate-300 hover:text-white hover:border-cyan-400 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="xl:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/70 mb-1 px-2">
                // System Navigation
              </div>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.label.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-200 hover:text-cyan-300 hover:bg-cyan-950/30 border border-transparent hover:border-cyan-500/20 text-base font-medium transition-all"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-cyan-500/60">&gt;</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
