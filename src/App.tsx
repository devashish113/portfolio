import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

// Advanced Scrolling & Animation
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Premium Stacking & Shrinking Sections Effect
    const sections = document.querySelectorAll('main > section');

    // Add a solid dark glass background to sections so they naturally overlap without looking messy
    sections.forEach((section) => {
      section.classList.add('bg-[#030303]/80', 'backdrop-blur-xl', 'border-t', 'border-white/5', 'will-change-transform');
    });

    sections.forEach((section, index) => {
      const isLast = index === sections.length - 1;
      if (isLast) return; // Don't shrink the very last section

      const htmlElement = section as HTMLElement;

      gsap.to(htmlElement, {
        scale: 0.85,
        opacity: 0.2,
        scrollTrigger: {
          trigger: htmlElement,
          // If section is taller than screen, pin when bottom hits bottom. If shorter, pin when top hits top.
          start: () => htmlElement.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          // The pinning ends when the NEXT section's bottom hits the bottom of the screen (or similar duration)
          // We can just use a fixed scroll distance or let it scrub until the bottom hits the top
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="antialiased selection:bg-blue-100 selection:text-blue-900 relative">

      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full -z-50 bg-[#030303]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100 mix-blend-screen"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <ParticleBackground />
        {/* Subtle vignette / dark overlay for readability across all sections */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.85)_100%)] pointer-events-none"></div>
        {/* Additional flat dark layer for ensuring high contrast across text */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        {/* <Experience /> */}
        <Skills />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
