import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const benefits = [
  "Culturally responsive mental health workshops for students",
  "Professional development for counselors and staff",
  "Student-led peer support program implementation",
  "Parent education sessions on teen mental health",
  "Crisis response planning and support",
  "Ongoing consultation and resources"
];

export default function Partnerships() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partnerships" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              For Schools
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
              Partner with Hope Bridge
            </h2>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Schools play a critical role in supporting student mental health. 
              Hope Bridge works alongside educators to create environments where 
              every student—especially those facing cultural pressures around success—feels supported.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Our programs are designed to complement existing school counseling services, 
              not replace them. We bring specialized understanding of Asian American teen 
              experiences that can enhance your school's support ecosystem.
            </p>

            <div className="mt-8">
              <Button 
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full shadow-lg shadow-blue-600/20"
              >
                Discuss Partnership
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                What we offer schools
              </h3>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  All school partnerships are customized based on your community's 
                  specific needs and existing resources.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}