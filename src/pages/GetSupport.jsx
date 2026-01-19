import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Users, Shield, ArrowRight } from 'lucide-react';

export default function GetSupport() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-[#F5F2ED] to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#2D3748] leading-tight mb-6">
              Support That Gets It
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              You don't have to navigate this alone. Hope Bridge offers safe, judgment-free support tailored to what Asian teens actually face.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-6">This Is For You If...</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'You feel pressure to be perfect at school',
                "You're navigating expectations from family and yourself",
                "You're exploring who you are beyond what others expect",
                'You feel caught between different cultural worlds',
                "You want to talk but don't know where to start",
                "You're dealing with stress, anxiety, or just feeling overwhelmed"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-6 shadow-sm border border-[#C4BFB8]/30"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8FA58C] mt-2 flex-shrink-0" />
                  <p className="text-[#5C5854] leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Support Looks Like */}
      <section className="py-20 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-12">What Support Looks Like</h2>
            <div className="space-y-8">
              {[
                {
                  icon: Users,
                  title: 'Peer Support Circles',
                  desc: 'Small groups (8-12 students) led by trained peer mentors. Share experiences, learn from each other, and build community with people who understand.'
                },
                {
                  icon: MessageCircle,
                  title: 'One-on-One Check-Ins',
                  desc: 'Connect with a peer mentor for individual conversations. Confidential, judgment-free, and completely on your terms.'
                },
                {
                  icon: Shield,
                  title: 'Resource Navigation',
                  desc: "Not sure where to turn? We help you find the right support—whether that's counseling, crisis resources, or just someone to talk to."
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30 flex gap-6"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-[#4A5568]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2D3748] mb-3">{item.title}</h3>
                    <p className="text-[#5C5854] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-12">What to Expect</h2>
            <div className="space-y-6">
              {[
                { title: 'Confidentiality', desc: 'What you share stays private. We follow strict confidentiality guidelines and only involve others if there's a safety concern.' },
                { title: 'No Pressure', desc: 'You decide what to share, when to share it, and how involved you want to be. There's no "right way" to use our support.' },
                { title: 'Cultural Awareness', desc: 'Our peer mentors are trained to understand family dynamics, cultural expectations, and the specific pressures Asian teens face.' },
                { title: 'Free & Accessible', desc: 'All our services are completely free. No barriers, no paperwork, no complicated intake process.' }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-l-4 border-[#8FA58C] bg-white rounded-r-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-[#2D3748] mb-2">{item.title}</h3>
                  <p className="text-[#5C5854] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 text-[#4A5568] mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">
              Ready to Reach Out?
            </h2>
            <p className="text-[#5C5854] text-lg mb-8 leading-relaxed">
              Taking the first step is the hardest part. We're here to make the rest easier.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] px-8 py-6 text-lg rounded-xl">
                Reach Out for Support
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}