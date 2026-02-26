import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
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
