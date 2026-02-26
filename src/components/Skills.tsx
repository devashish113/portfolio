import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-transparent relative border-t border-white/5">


      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight">
            Technical <span className="font-serif italic text-gray-500 font-normal">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {Object.entries(PORTFOLIO_DATA.skills).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card p-10 rounded-3xl border border-white/5 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-xl font-semibold mb-8 text-white tracking-wide uppercase text-sm flex items-center gap-3">
                <span className="w-8 h-[1px] bg-indigo-500/50"></span>
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-300 font-medium tracking-wide hover:bg-white/10 hover:border-white/20 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-default relative overflow-hidden group/skill"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover/skill:animate-[shimmer_1.5s_infinite]"></span>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
