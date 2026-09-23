import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Github,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Radio,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ContactLink {
  id: 'linkedin' | 'github' | 'email';
  name: string;
  description: string;
  url?: string;
  value?: string;
  color: string;
  glowColor: string;
  icon: typeof Linkedin;
}

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<'linkedin' | 'github' | 'email' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contactData: ContactLink[] = [
    {
      id: 'linkedin',
      name: 'LINKEDIN',
      description: 'Connect professionally',
      url: 'https://www.linkedin.com/in/nharikrishnan07/',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.45)',
      icon: Linkedin,
    },
    {
      id: 'github',
      name: 'GITHUB',
      description: 'Explore my code',
      url: 'https://github.com/harikrishnan-pspk',
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
      icon: Github,
    },
    {
      id: 'email',
      name: 'EMAIL',
      description: 'Send me a message',
      value: 'harikrishnan546.07@gmail.com',
      color: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      icon: Mail,
    },
  ];

  // Clipboard copy handler for email
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('harikrishnan546.07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Subtle floating background particles for contact section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(168, 85, 247, 0.3)',
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time + p.phase) * 0.5 + 0.5;
        const currentRadius = p.radius + pulse * 1.0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Ambient Background Canvas Particles ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60 z-0"
      />

      {/* ── Ambient Radial Glows ── */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-3xl z-0" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-center text-center mb-12 sm:mb-16">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm shadow-cyan-500/10">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>NEURAL CONNECTION //</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            ONLINE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
          CONNECT TO <span className="text-gradient-cyan">HARI</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 font-mono text-sm sm:text-base tracking-wide max-w-xl">
          "Let's connect, collaborate, and build something meaningful."
        </p>
      </div>

      {/* ── Main Neural Contact Glassmorphism Card ── */}
      <div className="relative z-10 max-w-4xl mx-auto rounded-3xl bg-[#060c20]/85 border border-cyan-500/30 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        {/* Futuristic Scanline Effect */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />

        {/* Top Shimmer Beam */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
          style={{ animation: 'shimmer 3s ease-in-out infinite' }}
        />

        {/* Cyber Corner Brackets */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />

        {/* Card Header Subtitle */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
            CONNECT TO HARI
          </div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest mt-1 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Neural connection available</span>
          </div>
        </div>

        {/* ── Central Core Node: [ HARI ] ── */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-10">
          <div className="relative flex items-center justify-center">
            {/* Pulsing outer aura ring */}
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-ping opacity-30" />
            <div className="absolute w-24 h-24 rounded-full border border-cyan-400/30 animate-pulse" />

            {/* Central glowing core disk */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#030712] border-2 border-cyan-400 p-4 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center z-20">
              <Sparkles className="w-5 h-5 text-cyan-400 mb-0.5" />
              <span className="text-xs sm:text-sm font-bold font-mono tracking-widest text-white">
                HARI
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">
            PRIMARY SYNAPSE UPLINK
          </span>
        </div>

        {/* ── Desktop SVG Synaptic Lines (Hidden on Mobile) ── */}
        <div className="hidden md:block relative w-full h-12 -mt-4 mb-2 pointer-events-none">
          <svg viewBox="0 0 800 80" className="w-full h-full overflow-visible">
            {/* Center origin: (400, 0) */}
            {/* Destination 1 (LinkedIn): (130, 80) */}
            <path
              d="M 400 0 Q 260 40 130 80"
              fill="none"
              stroke="#00f0ff"
              strokeWidth={hoveredNode === 'linkedin' ? 2.5 : 1.2}
              strokeOpacity={hoveredNode === 'linkedin' ? 0.95 : 0.3}
              className="transition-all duration-300"
            />
            {/* Destination 2 (GitHub): (400, 80) */}
            <path
              d="M 400 0 L 400 80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth={hoveredNode === 'github' ? 2.5 : 1.2}
              strokeOpacity={hoveredNode === 'github' ? 0.95 : 0.3}
              className="transition-all duration-300"
            />
            {/* Destination 3 (Email): (670, 80) */}
            <path
              d="M 400 0 Q 540 40 670 80"
              fill="none"
              stroke="#a855f7"
              strokeWidth={hoveredNode === 'email' ? 2.5 : 1.2}
              strokeOpacity={hoveredNode === 'email' ? 0.95 : 0.3}
              className="transition-all duration-300"
            />

            {/* Continuous traveling energy particles */}
            <circle r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #00f0ff)">
              <animateMotion
                path="M 400 0 Q 260 40 130 80"
                dur={hoveredNode === 'linkedin' ? '1.2s' : '2.8s'}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #38bdf8)">
              <animateMotion
                path="M 400 0 L 400 80"
                dur={hoveredNode === 'github' ? '1.2s' : '2.8s'}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #a855f7)">
              <animateMotion
                path="M 400 0 Q 540 40 670 80"
                dur={hoveredNode === 'email' ? '1.2s' : '2.8s'}
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* ── Mobile Vertical Line Connector (Visible on Mobile) ── */}
        <div className="md:hidden flex justify-center mb-6">
          <div className="w-[2px] h-8 bg-gradient-to-b from-cyan-400 to-transparent opacity-60" />
        </div>

        {/* ── Three Primary Connection Nodes ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-20">
          {contactData.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            const isEmail = node.id === 'email';

            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Node Box Wrapper */}
                <div
                  className="h-full p-6 sm:p-7 rounded-2xl bg-[#09112b]/80 border transition-all duration-300 flex flex-col justify-between"
                  style={{
                    borderColor: isHovered ? node.color : 'rgba(56, 189, 248, 0.2)',
                    boxShadow: isHovered
                      ? `0 0 25px -4px ${node.glowColor}`
                      : '0 4px 15px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  {/* Node Top Indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-xl border transition-colors duration-200"
                        style={{
                          backgroundColor: `${node.color}15`,
                          borderColor: `${node.color}40`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: node.color }} />
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: node.color }}
                        />
                        <span>NODE</span>
                      </div>
                    </div>

                    {/* Label & Description */}
                    <div className="text-lg font-bold text-white tracking-tight mb-1">
                      {node.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-4">
                      {node.description}
                    </div>

                    {/* Email Specific Display Address */}
                    {isEmail && (
                      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-cyan-300 select-all break-all mb-4">
                        {node.value}
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="pt-2">
                    {isEmail ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Direct Mailto Action */}
                        <a
                          href={`mailto:${node.value}`}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white font-mono text-xs font-semibold tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                          aria-label="Send email to Hari Krishnan"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>SEND</span>
                        </a>

                        {/* Copy Email Button */}
                        <button
                          onClick={handleCopyEmail}
                          className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                          title="Copy email to clipboard"
                          aria-label="Copy email address"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">EMAIL COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl border font-mono text-xs font-semibold tracking-wider text-center transition-all flex items-center justify-center gap-1.5 group"
                        style={{
                          backgroundColor: `${node.color}15`,
                          borderColor: `${node.color}35`,
                          color: '#ffffff',
                        }}
                      >
                        <span>CONNECT NODE</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Optional Contact Message & Primary CTA ── */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="text-base sm:text-lg font-bold text-white leading-snug">
              Have an idea, project, or opportunity?
            </div>
            <div className="text-xs sm:text-sm font-mono text-cyan-400 mt-0.5">
              Let's build it.
            </div>
          </div>

          <a
            href="mailto:harikrishnan546.07@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 group"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Subtle Section Footer ── */}
      <div className="relative z-10 mt-16 sm:mt-20 pt-8 border-t border-slate-900/80 text-center font-mono text-xs text-slate-500 space-y-1">
        <div>© 2026 Hari Krishnan</div>
        <div className="text-[11px] text-slate-600">
          Built with React • TypeScript • Three.js
        </div>
      </div>
    </section>
  );
};
