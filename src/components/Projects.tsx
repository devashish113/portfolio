import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';
import { ExternalLink, Github, X, Server, Database, Globe, Layers, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1000px] h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        onClick={onClick}
        className="glass-card rounded-3xl p-8 flex flex-col group relative overflow-hidden border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,0.15),0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:border-violet-400/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-colors duration-500 h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: "translateZ(0px)" }}></div>

        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300" style={{ transform: "translateZ(40px)" }}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed font-light" style={{ transform: "translateZ(30px)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(20px)" }}>
          {project.tags.slice(0, 4).map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium tracking-wide">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium tracking-wide">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10" style={{ transform: "translateZ(40px)" }}>
          <span className="text-sm font-medium text-indigo-400 flex items-center gap-2 group-hover:text-indigo-300 transition-colors group/link">
            Explore Case Study
            <ArrowRight className="w-4 h-4 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const selectedProject = selectedProjectIndex !== null ? PORTFOLIO_DATA.projects[selectedProjectIndex] : null;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProjectIndex]);

  return (
    <section id="projects" className="py-32 px-6 bg-transparent relative border-t border-white/5 min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-6 text-white tracking-tight">
            Case <span className="font-serif italic text-gray-500 font-normal">Studies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
            In-depth analysis of system architectures, tech stacks, and intelligent integrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} onClick={() => setSelectedProjectIndex(index)} />
          ))}
        </div>
      </div>

      {/* Full Page Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#030303]/95 backdrop-blur-3xl overflow-y-auto"
          >
            {/* Ambient Backgrounds to maintain premium feel inside modal */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 min-h-screen">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectIndex(null)}
                className="fixed top-8 right-8 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors z-50 group cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>

              {/* Title Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="mb-4 inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 text-indigo-400 text-sm tracking-widest uppercase font-semibold shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                  System Architecture
                </div>
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-8">
                  {selectedProject.title}
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
                  {selectedProject.description}
                </p>

                <div className="flex gap-4 mb-16">
                  <a href="#" className="pill-button pill-button-primary hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <Globe className="w-4 h-4" /> Live Demo
                  </a>
                  <a href="#" className="pill-button pill-button-secondary hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Visual Architecture Diagram Area */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Data Flow Overview</h3>

                  <div className="relative glass-card rounded-3xl p-8 aspect-video flex flex-col items-center justify-center gap-6 overflow-hidden border border-white/5">
                    {/* Architectural Animated Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d="M20,50 L80,50"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Architectural Nodes */}
                    <div className="flex w-full justify-between relative z-10 px-4">
                      {/* Node 1: Client / Web */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="w-16 h-16 rounded-2xl bg-[#030303]/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all"
                      >
                        <Globe className="w-8 h-8 text-blue-400" />
                      </motion.div>

                      {/* Node 2: Server / ML Engine */}
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="w-16 h-16 rounded-2xl bg-[#030303]/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(129,140,248,0.4)] transition-all"
                      >
                        <Server className="w-8 h-8 text-indigo-400" />
                      </motion.div>

                      {/* Node 3: Database / Object Storage */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="w-16 h-16 rounded-2xl bg-[#030303]/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer hover:border-purple-400 hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all"
                      >
                        <Database className="w-8 h-8 text-purple-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Implementation Tech Stack Area */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-10"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Implementation Scope</h3>
                    <ul className="space-y-4">
                      {selectedProject.details?.map((detail: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className="flex gap-4 text-gray-400 leading-relaxed font-light"
                        >
                          <span className="text-indigo-500 mt-1">●</span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Technology Framework</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag: string, idx: number) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.9 + idx * 0.05, type: "spring", stiffness: 200 }}
                          className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300 font-medium tracking-wide flex items-center gap-2 hover:bg-indigo-500/20 transition-colors cursor-default"
                        >
                          <Layers className="w-3 h-3" />
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
