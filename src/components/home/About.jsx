import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Compass } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              About Hope Bridge
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
              Built from understanding, driven by purpose
            </h2>
            
            <div className="mt-8 space-y-6 text-slate-600 leading-relaxed">
              <p>
                Hope Bridge was founded by individuals who experienced firsthand the 
                unique pressures facing Asian American teens—the weight of expectations, 
                the silence around mental health, and the isolation of feeling caught 
                between cultures.
              </p>

              <p>
                We created the support system we wished existed. Not one that treats 
                mental health as separate from cultural context, but one that integrates 
                understanding of family dynamics, academic pressure, and identity formation 
                into everything we do.
              </p>

              <p>
                Our approach isn't about fixing teens—it's about creating spaces where 
                they can process their experiences, develop resilience, and know they're 
                not alone. We work alongside families, schools, and communities to build 
                ecosystems of support.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Our Origin</h3>
              <p className="text-slate-600 leading-relaxed">
                Founded by Asian American youth advocates who saw the gap between 
                available mental health resources and what their community actually needed.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Our Focus</h3>
              <p className="text-slate-600 leading-relaxed">
                We concentrate specifically on Asian teen mental health because 
                specialized understanding leads to more effective support.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                A future where every Asian teen has access to mental health support 
                that honors their full identity and lived experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}