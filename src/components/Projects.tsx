import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data";
import {
  ExternalLink,
  Github,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Box,
  Code2,
} from "lucide-react";

// The 3D Hover Card Component
const ProjectCard = ({ project, index, onClick }: any) => {
  const [mainTitle, subTitle] = project.title.includes("–")
    ? project.title.split("–")
    : project.title.includes("-")
      ? project.title.split("-")
      : [project.title, ""];

  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`project-${index}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      whileHover={{ scale: 1.02, zIndex: 20 }}
      className="cursor-pointer w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[65vh] max-h-[700px] shrink-0 snap-center relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="glass-card rounded-[2rem] p-8 md:p-12 w-full h-full flex flex-col justify-between border border-white/10 shadow-2xl bg-[#080808]/90 backdrop-blur-3xl overflow-hidden relative group">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu translate-z-[-10px]"></div>

        <div className="z-10 transform-gpu translate-z-[30px]">
          <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 text-indigo-400 text-xs tracking-widest uppercase font-medium bg-indigo-500/5">
            Case Study {String(index + 1).padStart(2, "0")}
          </div>

          <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight mb-4">
            {mainTitle.trim()}
          </h3>
          {subTitle && (
            <p className="text-lg md:text-xl text-gray-400 mt-2 font-light leading-snug">
              {subTitle.trim()}
            </p>
          )}
        </div>

        <div className="z-10 transform-gpu translate-z-[40px] mt-auto">
          <p className="text-gray-400 text-sm md:text-base font-light line-clamp-3 mb-8">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-indigo-400 font-medium group-hover:text-indigo-300 transition-colors">
            Explore Architecture & Stack{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Full Page Modal Component
const ProjectModal = ({ project, index, onClose }: any) => {
  const [mainTitle, subTitle] = project.title.includes("–")
    ? project.title.split("–")
    : project.title.includes("-")
      ? project.title.split("-")
      : [project.title, ""];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <motion.div
        layoutId={`project-${index}`}
        className="relative w-full h-full max-w-7xl mx-auto bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-y-auto subtle-scrollbar flex flex-col rounded-[2rem] z-10"
      >
        <button
          onClick={onClose}
          className="sticky flex-shrink-0 top-6 left-full -ml-[80px] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-50 mt-6 mr-6"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 -mt-10">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 text-indigo-400 text-xs tracking-widest uppercase font-medium bg-indigo-500/5">
                  Case Study {String(index + 1).padStart(2, "0")}
                </div>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-indigo-500/20 to-transparent"></div>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
                {mainTitle.trim()}
              </h2>
              {subTitle && (
                <p className="text-xl md:text-2xl text-indigo-200/80 mt-2 font-light leading-snug mb-8">
                  {subTitle.trim()}
                </p>
              )}
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-16">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 hover:-translate-y-1 transition-all flex items-center gap-3"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-xl bg-white/5 text-white font-semibold text-sm border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center gap-3"
                  >
                    <Github className="w-5 h-5" /> Source Code
                  </a>
                )}
              </div>

              {/* Architecture Diagram Visualization Placeholder */}
              <div className="w-full p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="text-sm font-semibold text-white/50 mb-6 tracking-widest uppercase flex items-center gap-2 relative z-10">
                  <Box className="w-4 h-4 text-indigo-400" /> System
                  Architecture
                </h4>

                <div className="relative w-full h-48 border border-white/10 rounded-xl bg-[#030303] flex items-center justify-center relative z-10">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99,102,241,0.1)",
                        "0 0 40px rgba(99,102,241,0.3)",
                        "0 0 20px rgba(99,102,241,0.1)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-x-8 inset-y-8 border border-indigo-500/30 rounded-lg flex flex-col items-center justify-center bg-indigo-500/5"
                  >
                    <Code2 className="w-8 h-8 text-indigo-400/50 mb-2" />
                    <span className="text-indigo-200/50 font-mono text-xs tracking-widest">
                      [ Interactive Diagram Module ]
                    </span>
                  </motion.div>

                  {/* Data Flow Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h4 className="flex items-center gap-3 text-sm font-semibold text-white/50 mb-8 tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Key Implementations
              </h4>
              <ul className="space-y-6">
                {project.details?.map((detail: string, i: number) => (
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    key={i}
                    className="flex gap-5 text-gray-300 text-[15px] leading-relaxed font-light p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all"
                  >
                    <span className="text-indigo-500/50 mt-1.5 flex-shrink-0 text-xs">
                      ◆
                    </span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="flex items-center gap-3 text-sm font-semibold text-white/50 mb-6 tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                Tech Stack Animation
              </h4>
              <div className="flex flex-wrap gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                {project.tags.map((tag: string, i: number) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    key={i}
                    className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Layers className="w-4 h-4 text-violet-400" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        window.innerWidth > 1024
          ? window.innerWidth * 0.5
          : window.innerWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        window.innerWidth > 1024
          ? window.innerWidth * 0.5
          : window.innerWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative bg-[#030303] min-h-screen flex flex-col pt-24 pb-12 overflow-hidden items-center justify-center"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[50vh] h-[50vh] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-[50vh] h-[50vh] bg-violet-500/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2"></div>
      </div>

      <div className="w-full relative z-20 px-6 md:px-12 lg:px-24 mb-10 flex-shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight drop-shadow-2xl mb-4">
            Case{" "}
            <span className="font-serif italic text-indigo-400/80 font-normal">
              Studies
            </span>
          </h2>
          <div className="flex items-center gap-3 text-gray-400/80 text-xs md:text-sm font-light tracking-wide">
            <span className="w-8 h-[1px] bg-indigo-500/30"></span>
            Explore the architecture and implementation
          </div>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all text-white border border-white/20 hover:border-white/40 hover:bg-white/10 group active:scale-95 z-40"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all text-white border border-white/20 hover:border-white/40 hover:bg-white/10 group active:scale-95 z-40"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative w-full flex-grow overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory flex items-center px-6 md:px-12 lg:px-24 h-[70vh] py-8"
      >
        <div className="flex gap-6 md:gap-12 h-full py-4 items-center w-max">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => setSelectedProject(index)}
            />
          ))}
          <div className="w-[5vw] shrink-0"></div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectModal
            key="modal"
            project={PORTFOLIO_DATA.projects[selectedProject]}
            index={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
