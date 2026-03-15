import React from 'react';
import { motion } from 'framer-motion';

const programs = [
  {
    title: "Workshops & Discussions",
    description: "Interactive sessions on topics like managing academic stress, having difficult conversations with parents, and building emotional resilience."
  },
  {
    title: "School Partnerships",
    description: "We bring mental health awareness and support directly to schools through assemblies, counselor training, and student-led initiatives."
  },
  {
    title: "Resource Hub",
    description: "Curated resources for teens, parents, and educators, including guides on having mental health conversations across cultural contexts."
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-blue-900 leading-tight">
            Programs designed with <span className="text-blue-600">understanding</span>
          </h2>
          <p className="mt-6 text-lg text-blue-700">
            Every initiative is built with cultural context in mind, because support
            that doesn't understand your world can't truly help.
          </p>
        </motion.div>

        <div className="mt-16 divide-y divide-blue-200">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-8 grid md:grid-cols-3 gap-4 items-baseline"
            >
              <span className="text-xs font-semibold text-blue-500 tracking-widest uppercase">0{index + 1}</span>
              <h3 className="text-xl font-semibold text-blue-900">
                {program.title}
              </h3>
              <p className="text-blue-700 leading-relaxed text-sm">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}