import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const programs = [
  {
    icon: Users,
    title: "Peer Support Circles",
    description: "Weekly facilitated groups where teens share experiences in a safe, judgment-free space. Led by trained peer mentors who understand the cultural context.",
    gradient: "from-[#5B4E77] to-[#7B9AB8]"
  },
  {
    icon: BookOpen,
    title: "Workshops & Discussions",
    description: "Interactive sessions on stress management, identity exploration, family communication, and building resilience—all through a culturally informed lens.",
    gradient: "from-[#7B9AB8] to-[#5B4E77]"
  },
  {
    icon: MessageCircle,
    title: "Resource Hub",
    description: "Access culturally relevant mental health resources, self-care tools, and connections to professional support when needed.",
    gradient: "from-[#5B4E77] to-[#7B9AB8]"
  },
  {
    icon: Sparkles,
    title: "Community Events",
    description: "Connect with other Asian teens through creative workshops, wellness activities, and community-building events throughout the year.",
    gradient: "from-[#7B9AB8] to-[#5B4E77]"
  }
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Programs designed with{' '}
              <span className="bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] bg-clip-text text-transparent">
                cultural understanding
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              All our programs are free, culturally informed, and created specifically for Asian American teens 
              navigating the unique challenges of identity, expectations, and mental wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6 shadow-sm`}>
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white/50 to-[#E8EEF3]/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Ready to Get Involved?
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Join one of our programs or reach out to learn more about how we can support you.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] hover:from-[#3F3351] hover:to-[#5B4E77] text-white rounded-full px-8 py-6 text-lg shadow-md">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}