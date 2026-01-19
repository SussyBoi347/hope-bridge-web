import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Building, BookMarked, ArrowUpRight } from 'lucide-react';

const programs = [
  {
    icon: MessageCircle,
    title: "Peer Support Circles",
    description: "Small group sessions facilitated by trained peer mentors who understand the Asian American teen experience. A space to share, listen, and feel less alone.",
    color: "from-blue-600 via-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Workshops & Discussions",
    description: "Interactive sessions on topics like managing academic stress, having difficult conversations with parents, and building emotional resilience.",
    color: "from-sky-600 via-blue-500 to-cyan-500"
  },
  {
    icon: Building,
    title: "School Partnerships",
    description: "We bring mental health awareness and support directly to schools through assemblies, counselor training, and student-led initiatives.",
    color: "from-blue-700 via-blue-600 to-blue-500"
  },
  {
    icon: BookMarked,
    title: "Resource Hub",
    description: "Curated resources for teens, parents, and educators—including guides on having mental health conversations across cultural contexts.",
    color: "from-sky-500 via-blue-400 to-cyan-400"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            Programs designed with understanding
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Every initiative is built with cultural context in mind—because support 
            that doesn't understand your world can't truly help.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-white border border-blue-100/40 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300 overflow-hidden">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}