import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const pathways = [
  { title: "Students", description: "Explore programs, attend a workshop, or reach out when you need someone who understands.", cta: "Find Support", page: "GetSupport" },
  { title: "Parents & Families", description: "Access resources designed to help you understand and support your teen's mental health journey.", cta: "Learn More", page: "GetSupport" },
  { title: "Schools & Organizations", description: "Partner with us to bring mental health awareness and support programs directly to your students.", cta: "Partner With Us", page: "Partnerships" },
  { title: "Supporters & Donors", description: "Your contribution keeps all programs free and accessible to every teen who needs them.", cta: "Support Our Work", page: "Donate" },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-blue-900 leading-tight">
            There's a place{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">for you here</span>
          </h2>
        </motion.div>

        <div className="divide-y divide-blue-100">
          {pathways.map((pathway, index) => (
            <motion.div key={pathway.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
              className="py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 group">
              <div className="sm:w-48 flex-shrink-0">
                <span className="text-xs font-black tracking-widest uppercase text-blue-400">0{index + 1}</span>
                <h3 className="text-xl font-bold text-blue-900 mt-1">{pathway.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed flex-1">{pathway.description}</p>
              <Link to={createPageUrl(pathway.page)} className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors whitespace-nowrap sm:group-hover:gap-3">
                {pathway.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
