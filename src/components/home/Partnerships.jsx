import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const benefits = [
  "Culturally responsive mental health workshops",
  "Professional development for counselors and staff",
  "Student-led peer support program implementation",
  "Parent education sessions on teen mental health",
  "Crisis response planning and support",
  "Ongoing consultation and resources",
];

export default function Partnerships() {
  return (
    <section id="partnerships" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Partner with{' '}
              <span className="text-blue-200">Hope Bridge</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Schools play a critical role in supporting student mental health. Hope Bridge works alongside educators to create environments where every student, especially those facing cultural pressures, feels supported.
            </p>
            <Link to={createPageUrl('Partnerships')}>
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl px-7 py-3 shadow-xl shadow-blue-900/20 transition-all duration-200">
                Discuss Partnership <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/20 backdrop-blur-sm p-8">
              <h3 className="text-lg font-bold text-blue-100 mb-6">What we bring to your school</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
