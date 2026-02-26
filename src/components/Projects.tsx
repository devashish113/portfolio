import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-6 text-white tracking-tight">
            Featured <span className="font-serif italic text-gray-500 font-normal">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
            Showcasing expertise in Cloud, DevOps, and intelligent AI integrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl p-8 flex flex-col group relative overflow-hidden border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,0.15),0_4px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Premium hover glow effect */}
              <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 4).map((tag, i) => (
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

              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                <a href="#" className="text-sm font-medium text-gray-300 flex items-center gap-2 hover:text-white transition-colors group/link">
                  View Project
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors relative">
                  <span className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                  <Github className="w-5 h-5 relative z-10" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
