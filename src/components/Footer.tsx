import { PORTFOLIO_DATA } from '../data';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-serif font-semibold tracking-tight text-white flex items-center gap-2 group cursor-pointer">
          devashish<span className="text-indigo-500">.</span>
        </div>

        <p className="text-sm text-gray-500 font-light">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-gray-500">
          <a href={PORTFOLIO_DATA.github} className="hover:text-white hover:scale-110 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href={PORTFOLIO_DATA.linkedin} className="hover:text-white hover:scale-110 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.email}`} className="hover:text-white hover:scale-110 transition-all duration-300">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
