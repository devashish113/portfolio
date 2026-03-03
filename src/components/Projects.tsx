import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data";
import {
  ExternalLink,
  Github,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProjectCard = ({ project, index }: any) => {
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
    setRotateX(((y - centerY) / centerY) * -6);
    setRotateY(((x - centerX) / centerX) * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="w-[88vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] shrink-0 snap-center h-full"
      style={{ transformStyle: "preserve-3d" }}
      data-project-card
    >
      <div className="glass-card rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-12 w-full h-full flex flex-col border border-white/10 shadow-2xl bg-[#080808]/90 backdrop-blur-3xl overflow-hidden relative group">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Top Row: Badge + Links */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs tracking-widest uppercase font-medium bg-indigo-500/5">
            Project {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight mb-2 flex-shrink-0">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-5 flex-shrink-0">
          {project.description}
        </p>

        {/* Two Column: Details + Tech Stack */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 flex-grow min-h-0 overflow-hidden">
          {/* Left: Implementation Details */}
          <div className="w-full lg:w-[60%] flex flex-col min-h-0">
            <h4 className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-white/40 mb-3 tracking-[0.15em] uppercase flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-indigo-500" />
              Key Implementations
            </h4>
            <ul className="space-y-1.5 overflow-y-auto subtle-scrollbar pr-2 flex-grow min-h-0">
              {project.details?.map((detail: string, i: number) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-gray-300 text-[11px] sm:text-xs md:text-[13px] leading-relaxed font-light hover:text-white transition-colors"
                >
                  <span className="text-indigo-500/50 mt-[5px] flex-shrink-0 text-[8px]">
                    ◆
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Tech Stack */}
          <div className="w-full lg:w-[40%] flex flex-col lg:pl-6 lg:border-l border-white/5 min-h-0">
            <h4 className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-white/40 mb-3 tracking-[0.15em] uppercase flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-violet-500" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 content-start flex-grow">
              {project.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[10px] md:text-xs text-gray-400 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  <Layers className="w-3 h-3 text-violet-400/70" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons at the bottom */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-gray-200 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 flex-1 justify-center whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/5 text-white font-semibold text-xs border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 flex-1 justify-center whitespace-nowrap"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projectCount = PORTFOLIO_DATA.projects.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const cards = container.querySelectorAll("[data-project-card]");
      if (!cards[index]) return;

      const card = cards[index] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      // Calculate offset to center the card in the container
      const scrollOffset =
        card.offsetLeft -
        container.offsetLeft -
        containerRect.width / 2 +
        cardRect.width / 2;

      container.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
      setActiveIndex(index);
    },
    [scrollContainerRef],
  );

  const goLeft = useCallback(() => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const goRight = useCallback(() => {
    if (activeIndex < projectCount - 1) scrollToIndex(activeIndex + 1);
  }, [activeIndex, projectCount, scrollToIndex]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goRight();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goLeft();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goLeft, goRight]);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col py-20 overflow-hidden bg-transparent"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[50vh] h-[50vh] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[50vh] h-[50vh] bg-violet-500/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2" />
      </div>

      {/* Header */}
      <div className="w-full relative z-20 px-6 md:px-12 lg:px-24 mb-8 flex-shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight drop-shadow-2xl mb-3">
            Selected{" "}
            <span className="font-serif italic text-indigo-400/80 font-normal">
              Works
            </span>
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={goLeft}
            disabled={activeIndex === 0}
            className={`w-11 h-11 rounded-full glass-card flex items-center justify-center transition-all text-white border group active:scale-95 z-40 ${activeIndex === 0 ? "opacity-30 border-white/5 cursor-not-allowed" : "border-white/20 hover:border-white/40 hover:bg-white/10"}`}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={goRight}
            disabled={activeIndex === projectCount - 1}
            className={`w-11 h-11 rounded-full glass-card flex items-center justify-center transition-all text-white border group active:scale-95 z-40 ${activeIndex === projectCount - 1 ? "opacity-30 border-white/5 cursor-not-allowed" : "border-white/20 hover:border-white/40 hover:bg-white/10"}`}
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full flex-grow overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory flex items-stretch px-6 md:px-12 lg:px-24"
        style={{ minHeight: "65vh" }}
      >
        <div className="flex gap-6 md:gap-10 h-full py-2 items-stretch w-max">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
          <div className="w-[5vw] shrink-0" />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6 relative z-20">
        {PORTFOLIO_DATA.projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 h-2 bg-indigo-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

