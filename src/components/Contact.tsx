import { motion } from 'motion/react';
import { Mail, Phone, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-transparent relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-sans font-bold mb-8 text-white tracking-tight leading-[1.1]">
              Let's Build <br /> <span className="font-serif italic text-gray-500 font-normal">Something Great</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Currently open for entry-level Cloud/DevOps roles. Feel free to reach out if you're looking for a dedicated engineer to elevate your infrastructure.
            </p>

            <div className="space-y-8">
              <motion.a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 text-gray-400 hover:text-white transition-all group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1">Email</p>
                  <p className="text-lg font-medium">{PORTFOLIO_DATA.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={`tel:${PORTFOLIO_DATA.phone}`}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 text-gray-400 hover:text-white transition-all group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1">Phone</p>
                  <p className="text-lg font-medium">{PORTFOLIO_DATA.phone}</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-10 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden"
          >
            {/* Subtle card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] pointer-events-none"></div>

            <form className="space-y-6 relative" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div className="relative group">
                  <input type="text" id="name" className="peer w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors" placeholder="John Doe" />
                  <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white cursor-text">Name</label>
                </div>

                <div className="relative group">
                  <input type="email" id="email" className="peer w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors" placeholder="john@example.com" />
                  <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white cursor-text">Email</label>
                </div>

                <div className="relative group pt-4">
                  <textarea id="message" rows={4} className="peer w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors resize-none" placeholder="How can I help you?"></textarea>
                  <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white cursor-text">Message</label>
                </div>
              </div>

              <button className="pill-button pill-button-primary w-full mt-10 h-14 group">
                <span className="flex items-center gap-2">
                  Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
