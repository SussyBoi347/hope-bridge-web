import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Contact from '@/components/home/Contact';
import StorySection from '@/components/home/StorySection.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Mission />
      <Problem />
      <StorySection />
      <section id="vision" className="py-24 lg:py-32 bg-gradient-to-br from-black via-slate-950 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-cyan-300 font-medium text-sm tracking-wide uppercase">
              Our Vision
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Real stories, real change
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-10 lg:p-14 shadow-[0_0_60px_rgba(0,217,255,0.3)] border border-cyan-500/30">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  Where we're headed
                </h3>
                <p className="text-gray-300">
                  Our commitment to the community
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { target: "500+", label: "Teens supported by 2026" },
                  { target: "25", label: "School partnerships" },
                  { target: "100%", label: "Free programs" }
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {goal.target}
                    </div>
                    <p className="text-gray-300 text-sm">
                      {goal.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CommunitySurvey />
      <Contact />
    </div>
  );
}