import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-transparent relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:flex gap-12 xl:gap-20 items-center justify-between"
        >
          {/* Text Content (80%) */}
          <div className="lg:w-[80%] order-2 lg:order-1 mt-16 lg:mt-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-10 text-white tracking-tight">
              About <span className="font-serif italic text-gray-500 font-normal">Me</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-400 leading-[1.8] font-light max-w-4xl">
              <p>
                I build production-ready systems across full-stack development, cloud infrastructure, and DevOps.
              </p>
              <p>
                With a background in Electronics and Communication Engineering, I approach software as a complete system — from device-level communication to scalable backend architecture and cloud deployment.
              </p>
              <p>
                I have hands-on experience with AWS (EC2, S3, IAM, VPC), Docker, Jenkins CI/CD, Linux, Git, and databases. I've developed AI-based applications, containerized them, and deployed them on AWS infrastructure.
              </p>
              <p>
                In addition, I build full-stack web applications using React and Node.js and actively work on IoT-cloud integrated systems using ESP32-CAM and AWS.
              </p>
            </div>

            <div className="mt-12 flex gap-4 max-w-sm">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 glass-card rounded-2xl w-full border border-white/5 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-semibold text-white mb-2 tracking-wide uppercase text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Education Highlight
                </h3>
                <p className="text-base text-gray-300 font-medium">{PORTFOLIO_DATA.education[0].degree}</p>
                <p className="text-sm text-gray-500 mt-2">{PORTFOLIO_DATA.education[0].institution}</p>
              </motion.div>
            </div>
          </div>

          {/* Visual Area (30%) */}
          <div className="lg:w-[30%] order-1 lg:order-2 relative flex justify-center items-center mt-8 lg:mt-0 hidden md:flex">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[280px] aspect-[3/4] rounded-[2rem] overflow-hidden glass-card flex items-center justify-center relative group border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)]"
            >
              {/* Image */}
              <img
                src="/devis.jpeg"
                alt="Devashish Kumar"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Minimal overlay for text readability/blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-60"></div>
            </motion.div>

            {/* Ambient minimalist glows */}
            <div className="absolute -bottom-10 right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-[80px] -z-10 animate-pulse delay-1000"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
