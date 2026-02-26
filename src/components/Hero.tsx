import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
      {/* Optional Subtle Grid Pattern Overlay (Kept for texture) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 inline-block relative group cursor-pointer"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <span className="badge relative">
            {PORTFOLIO_DATA.role}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tight mb-8">
            <span className="block drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">From Design</span>
            <span className="block drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">to Production</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-14 leading-relaxed font-light tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          Transforming ideas into production-grade software,<br className="hidden md:block" /> engineering systems that scale beyond code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <a href="#projects" className="pill-button pill-button-primary w-full sm:w-auto h-14 px-8 text-base">
            Experience Work <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="pill-button pill-button-secondary w-full sm:w-auto h-14 px-8 text-base group">
            Talk to Me
            <FileText className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gray-500/30 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, 48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
