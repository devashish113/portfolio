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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // We removed the GSAP section pinning/stacking effect per user request
    // Sections will now scroll normally while the video stays fixed in the background

    return () => {
      lenis.destroy();
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
        {/* Light vignette for readability without completely hiding the video */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.5)_100%)] pointer-events-none"></div>
        {/* Flat dark layer — keeps text readable without hiding video (increased to 30% to darken background) */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
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
