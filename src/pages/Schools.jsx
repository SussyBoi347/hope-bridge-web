import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Heart, Shield, MessageCircle, ArrowRight } from 'lucide-react';

export default function Schools() {
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
              Partner With Hope Bridge
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              Bring culturally aware mental health support to your school community. We work alongside educators to create safer, healthier environments for Asian American students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-6">
              Why School Partnerships Matter
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Students spend most of their time at school',
                  desc: 'When mental health support exists within school walls, access barriers disappear.'
                },
                {
                  title: 'Stigma is strongest in silence',
                  desc: 'School-wide initiatives normalize mental health conversations and reduce shame.'
                },
                {
                  title: 'Educators need resources too',
                  desc: 'Teachers and counselors benefit from culturally informed training and tools.'
                },
                {
                  title: 'Early intervention changes trajectories',
                  desc: 'Reaching students before crises happen creates healthier long-term outcomes.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#C4BFB8]/30"
                >
                  <h3 className="font-semibold text-[#2D3748] mb-2">{item.title}</h3>
                  <p className="text-[#5C5854] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-12">
              What Hope Bridge Offers Schools
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Student Workshops & Assemblies',
                  desc: 'Interactive sessions on stress management, cultural identity, mental health literacy, and peer support. Tailored to your student body.'
                },
                {
                  icon: GraduationCap,
                  title: 'Professional Development',
                  desc: 'Training for counselors, teachers, and administrators on culturally responsive mental health support and how to recognize struggling students.'
                },
                {
                  icon: Heart,
                  title: 'Peer Support Programs',
                  desc: 'We help you establish student-led peer support circles within your school, including mentor training and ongoing facilitation support.'
                },
                {
                  icon: BookOpen,
                  title: 'Parent Education',
                  desc: 'Resources and workshops for parents on supporting teen mental health while navigating cultural expectations and generational differences.'
                },
                {
                  icon: Shield,
                  title: 'Crisis Planning & Resources',
                  desc: 'Help developing culturally aware crisis response protocols and connecting students to appropriate support services.'
                },
                {
                  icon: MessageCircle,
                  title: 'Ongoing Consultation',
                  desc: "We don't just visit once. Our team provides continued partnership, resources, and guidance as your program grows."
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
                    <h3 className="text-xl font-semibold text-[#2D3748] mb-2">{item.title}</h3>
                    <p className="text-[#5C5854] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Partnerships Work */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-12">
              How Partnerships Work
            </h2>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Initial Conversation', desc: 'We learn about your school community, specific needs, and existing resources.' },
                { step: '2', title: 'Customized Plan', desc: "Together, we design a partnership that fits your school—whether that's workshops, ongoing programs, or staff training." },
                { step: '3', title: 'Implementation', desc: 'Our team works alongside your staff to launch programs, train peer mentors, and provide resources.' },
                { step: '4', title: 'Ongoing Support', desc: 'We check in regularly, adjust as needed, and continue supporting your community long-term.' }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-[#4A5568] text-[#FAF8F5] flex items-center justify-center font-semibold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#C4BFB8]/30 flex-1">
                    <h3 className="font-semibold text-[#2D3748] mb-2">{item.title}</h3>
                    <p className="text-[#5C5854] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 bg-[#F5F2ED] rounded-xl p-6 text-center">
              <p className="text-[#5C5854] text-sm">
                <span className="font-semibold text-[#2D3748]">Note:</span> All programs are customized to your school's needs, culture, and student population. No two partnerships look the same.
              </p>
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
            <GraduationCap className="w-16 h-16 text-[#4A5568] mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">
              Start the Conversation
            </h2>
            <p className="text-[#5C5854] text-lg mb-8 leading-relaxed">
              Whether you're a counselor, administrator, or teacher—we'd love to explore how Hope Bridge can support your students.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] px-8 py-6 text-lg rounded-xl">
                Partner With Hope Bridge
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}