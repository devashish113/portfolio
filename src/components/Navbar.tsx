import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out px-6 ${
        scrolled ? 'py-4 glass-nav bg-black/40 backdrop-blur-md shadow-2xl shadow-indigo-500/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-serif font-semibold tracking-tight text-white flex items-center gap-2 group"
        >
          Devashish
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative overflow-hidden group py-1"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {link.name}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
            Contact Me <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
          <a href="/resume.pdf" className="pill-button pill-button-primary text-sm py-2 px-6 ml-4">
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  className="text-2xl font-serif text-gray-300 hover:text-white hover:translate-x-2 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10"
              >
                <a href="#contact" className="text-lg text-gray-300" onClick={() => setIsOpen(false)}>Contact Me</a>
                <a href="/resume.pdf" className="pill-button pill-button-primary justify-center" onClick={() => setIsOpen(false)}>Download Resume</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
