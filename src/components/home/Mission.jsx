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
    <section id="mission" className="py-24 lg:py-32 bg-gradient-to-b from-white via-blue-50 to-sky-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl">

          <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
            Mental health support that understands your experience
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">Hope Bridge exists because too many Asian teens face pressure alone. We're building the support system we wish existed one that gets the unique challenges of balancing family expectations, cultural identity, and personal wellbeing.



          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) =>
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group">

              <div className="p-6 rounded-2xl bg-white border border-blue-100/50 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100/50 flex items-center justify-center mb-5 group-hover:from-blue-100 group-hover:to-sky-100 transition-all">
                  <pillar.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 min-h-[3rem] flex items-center">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}