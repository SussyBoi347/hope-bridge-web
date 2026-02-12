import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Shield, Sparkles, Heart } from 'lucide-react';

const pillars = [
{
  icon: Users,
  title: "Embracing Cultural Identity",
  description: "Helping Asian teens navigate the beautiful complexity of their bicultural identity and celebrate both cultures."
},
{
  icon: BookOpen,
  title: "Navigating Academic Pressures",
  description: "Supporting teens facing intense academic expectations while maintaining mental wellness and redefining success."
},
{
  icon: Heart,
  title: "Healing Family Disconnect",
  description: "Building bridges between generations to foster understanding and open communication at home."
},
{
  icon: Shield,
  title: "Breaking Stigma",
  description: "Normalizing mental health conversations in communities where they've been silenced."
}];


export default function Mission() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              understands your experience
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">Hope Bridge exists because too many Asian teens face pressure alone. We're building the support system we wish existed one that gets the unique challenges of balancing family expectations, cultural identity, and personal wellbeing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) =>
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group">

              <div className="p-6 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col backdrop-blur-sm hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-[3rem] flex items-center">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}