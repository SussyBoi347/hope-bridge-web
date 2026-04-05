import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  {
    num: "01",
    title: "Workshops & Discussions",
    description: "Interactive sessions on managing academic stress, having difficult conversations with parents, and building emotional resilience.",
    accent: "bg-blue-400",
    tag: "In-Person & Virtual",
  },
  {
    num: "02",
    title: "School Partnerships",
    description: "We bring mental health awareness directly to schools through assemblies, counselor training, and student-led initiatives.",
    accent: "bg-blue-300",
    tag: "K-12 Program",
  },
  {
    num: "03",
    title: "Resource Hub",
    description: "Curated resources for teens, parents, and educators, guides on mental health conversations across cultural contexts.",
    accent: "bg-blue-200",
    tag: "Always Free",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/20 translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-900/50 -translate-x-1/3 translate-y-1/3 blur-2xl pointer-events-none" />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Programs designed{' '}
              <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                with understanding
              </span>
            </h2>
          </div>
          <Link to={createPageUrl('Programs')}>
            <Button className="bg-white text-blue-800 hover:bg-blue-50 font-bold rounded-xl px-6 py-3 transition-all duration-200 whitespace-nowrap shadow-lg">
              All Programs <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </Link>
        </motion.div>

        <div className="space-y-0 divide-y divide-blue-700/50">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-8 grid md:grid-cols-12 gap-4 items-center group"
            >
              <div className="md:col-span-1">
                <span className="text-xs font-black text-blue-400 tracking-widest">{program.num}</span>
              </div>
              <div className="md:col-span-1">
                <div className={`w-2 h-10 rounded-full ${program.accent} opacity-80`} />
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-200">
                  {program.title}
                </h3>
              </div>
              <div className="md:col-span-4">
                <p className="text-blue-200 text-sm leading-relaxed">{program.description}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">
                  {program.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
