import React from 'react';
import { motion } from 'framer-motion';

const goals = [
  { target: "500+", label: "Teens supported by 2025" },
  { target: "25", label: "School partnerships" },
  { target: "100%", label: "Free programs" }
];

export default function Impact() {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-cyan-300 font-medium text-sm tracking-wide uppercase">
            Our Impact
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
           <span className="font-bold bg-gradient-to-r from-cyan-300 to-cyan-200 bg-clip-text text-transparent">Real stories</span>, real change
          </h2>
          <p className="mt-6 text-lg text-blue-100">
            We measure our success not in numbers alone, but in the moments when 
            a teen feels understood for the first time.
          </p>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-10 lg:p-14 shadow-2xl shadow-blue-300/30">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Where we're headed
              </h3>
              <p className="text-white/80">
                Our commitment to the community
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {goal.target}
                  </div>
                  <p className="text-white/80 text-sm">
                    {goal.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}