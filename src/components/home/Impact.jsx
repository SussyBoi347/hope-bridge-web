import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '../CountUp';

const goals = [
  { target: "5000+", label: "Teens supported by 2027", shade: "from-blue-300 to-blue-400" },
  { target: "25", label: "School partnerships", shade: "from-blue-200 to-blue-300" },
  { target: "100%", label: "Free programs, always", shade: "from-white to-blue-100" },
];

export default function Impact() {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Real goals,{' '}
            <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">real change</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-12 lg:gap-20">
          {goals.map((goal, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <div className={`h-1 w-10 mb-6 rounded-full bg-gradient-to-r ${goal.shade}`} />
              <CountUp value={goal.target} className={`text-5xl lg:text-6xl font-black bg-gradient-to-r ${goal.shade} bg-clip-text text-transparent block mb-3`} />
              <p className="text-blue-200 text-sm leading-relaxed">{goal.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
