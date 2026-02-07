import React from 'react';
import { motion } from 'framer-motion';

const statistics = [
{ number: "1 in 5", label: "Asian American teens report symptoms of depression" },
{ number: "50%", label: "less likely to seek mental health support than peers" },
{ number: "71%", label: "feel pressure to succeed academically from family" }];


export default function Problem() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <span className="text-cyan-300 font-medium text-sm tracking-wide uppercase">
              The Challenge
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white leading-tight">
              A silent struggle many teens face alone
            </h2>
            
            <div className="mt-8 space-y-6">
              <p className="text-blue-100 leading-relaxed">
                For many Asian teens, mental health struggles happen in silence. 
                Cultural expectations around success, family honor, and emotional restraint 
                create environments where asking for help feels impossible.
              </p>
              
              <p className="text-blue-100 leading-relaxed">The pressure to excel academically while navigating identity between two cultures often without the language to express these feelings at home leaves many teens isolated during their most formative years.



              </p>

              <p className="text-blue-100 leading-relaxed">
                This isn't about blame. It's about understanding that our communities need 
                new pathways to support the next generation. Hope Bridge is building those pathways.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative">

            {/* Abstract visual element */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-300/5 to-sky-300/10 rounded-3xl" />
            
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/20 border border-white/40">
              <h3 className="text-xl font-semibold text-blue-900 mb-8">
                The reality we're addressing
              </h3>
              
              <div className="space-y-8">
                {statistics.map((stat, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-5">

                    <div className="flex-shrink-0 w-20">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {stat.number}
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-slate-600 leading-relaxed">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-500 italic">
                  Sources: SAMHSA National Survey, AAPI Data, Mental Health America
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}