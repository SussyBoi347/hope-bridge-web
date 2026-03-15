import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
{
  title: "Embracing Cultural Identity",
  description: "Helping Asian teens navigate the beautiful complexity of their bicultural identity and celebrate both cultures."
},
{
  title: "Navigating Academic Pressures",
  description: "Supporting teens facing intense academic expectations while maintaining mental wellness and redefining success."
},
{
  title: "Healing Family Disconnect",
  description: "Building bridges between generations to foster understanding and open communication at home."
},
{
  title: "Breaking Stigma",
  description: "Normalizing mental health conversations in communities where they've been silenced."
}];


export default function Mission() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20">

          <span className="text-blue-600 font-medium text-sm tracking-widest uppercase">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Mental health support that{' '}
            <span className="text-blue-700">
              understands your experience
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">Hope Bridge exists because too many Asian teens face pressure alone. We're building the support system we wish existed one that gets the unique challenges of balancing family expectations, cultural identity, and personal wellbeing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 border-t border-blue-200 pt-12">
          {pillars.map((pillar, index) => {
            const accents = ['text-blue-400', 'text-blue-600', 'text-blue-700', 'text-blue-900'];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <span className={`text-xs font-semibold tracking-widest uppercase ${accents[index]}`}>0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>);

}