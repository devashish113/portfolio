import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-transparent relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight">
            Journey & <span className="font-serif italic text-gray-500 font-normal">Impact</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative pl-8 md:pl-0 group"
            >
              <div className="md:grid md:grid-cols-4 gap-12 items-start">
                <div className="mb-4 md:mb-0 text-gray-500 text-sm font-medium pt-2 md:text-right font-serif italic tracking-wide">
                  {exp.period}
                </div>
                <div className="md:col-span-3 relative glass-card p-8 rounded-3xl border border-violet-500/30 hover:border-violet-400/50 shadow-[0_0_25px_rgba(139,92,246,0.15),0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
                  {/* Timeline connectors */}
                  <div className="hidden md:block absolute -left-[3.5rem] top-8 w-4 h-4 bg-black rounded-full border border-violet-500/50 group-hover:border-violet-400 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-500 z-10">
                    <div className="absolute inset-1 bg-violet-400/50 rounded-full"></div>
                  </div>
                  <div className="hidden md:block absolute -left-[3.15rem] top-12 bottom-[-4rem] w-px bg-gradient-to-b from-white/10 to-transparent group-hover:from-white/30 transition-colors duration-500"></div>

                  <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">{exp.role}</h3>
                  <p className="text-gray-400 font-medium mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {exp.company}
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed font-light">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education timeline items */}
          {PORTFOLIO_DATA.education.map((edu, index) => (
            <motion.div
              key={`edu-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative pl-8 md:pl-0 group"
            >
              <div className="md:grid md:grid-cols-4 gap-12 items-start">
                <div className="mb-4 md:mb-0 text-gray-500 text-sm font-medium pt-2 md:text-right font-serif italic tracking-wide">
                  {edu.period}
                </div>
                <div className="md:col-span-3 relative glass-card p-8 rounded-3xl border border-violet-500/30 hover:border-violet-400/50 shadow-[0_0_25px_rgba(139,92,246,0.15),0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
                  <div className="hidden md:block absolute -left-[3.5rem] top-8 w-4 h-4 bg-black rounded-full border border-violet-500/50 group-hover:border-violet-400 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-500 z-10"></div>
                  {index !== PORTFOLIO_DATA.education.length - 1 && (
                    <div className="hidden md:block absolute -left-[3.15rem] top-12 bottom-[-4rem] w-px bg-gradient-to-b from-white/10 to-transparent"></div>
                  )}

                  <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">{edu.degree}</h3>
                  <p className="text-gray-400 font-medium tracking-wide text-sm">{edu.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
