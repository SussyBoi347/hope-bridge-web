import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Shield, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: "Academic Pressure",
    description: "Helping teens develop healthy relationships with achievement and self-worth beyond grades."
  },
  {
    icon: Users,
    title: "Cultural Identity",
    description: "Creating space to explore the complexities of navigating multiple cultural identities."
  },
  {
    icon: Shield,
    title: "Breaking Stigma",
    description: "Normalizing mental health conversations in communities where they've been silenced."
  },
  {
    icon: Sparkles,
    title: "Safe Spaces",
    description: "Building peer communities where teens feel understood, not judged."
  }
];

export default function Mission() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-indigo-600 font-medium text-sm tracking-wide uppercase">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            Mental health support that understands your experience
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Hope Bridge exists because too many Asian teens face pressure alone. 
            We're building the support system we wish existed—one that gets the unique 
            challenges of balancing family expectations, cultural identity, and personal wellbeing.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-100/50 hover:border-indigo-300/50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-5 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors shadow-sm">
                  <pillar.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}