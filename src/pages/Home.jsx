import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Users, BookOpen, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-[#F5F2ED] to-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#2D3748] leading-[1.1] mb-8">
              Supporting Asian Teens Through Academic Pressure and Identity Struggles
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-3xl mx-auto mb-12">
              Hope Bridge provides safe, culturally aware mental health support for Asian teens navigating school, family expectations, and identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('GetSupport')}>
                <Button className="bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] px-8 py-6 text-lg rounded-xl">
                  Get Support
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Schools')}>
                <Button variant="outline" className="border-2 border-[#4A5568] text-[#4A5568] hover:bg-[#F5F2ED] px-8 py-6 text-lg rounded-xl">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">
              A Different Kind of Support
            </h2>
            <p className="text-lg text-[#5C5854] max-w-3xl mx-auto leading-relaxed">
              We understand the unique pressures Asian teens face. Hope Bridge creates spaces where mental health conversations are welcomed, not silenced.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Academic Pressure', desc: 'Navigate achievement without sacrificing wellbeing' },
              { icon: Users, title: 'Cultural Identity', desc: 'Explore who you are across multiple worlds' },
              { icon: Shield, title: 'Breaking Stigma', desc: 'Normalize mental health in our communities' },
              { icon: Heart, title: 'Safe Spaces', desc: 'Feel understood, not judged' }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F5F2ED] flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-[#4A5568]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3748] mb-3">{item.title}</h3>
                <p className="text-[#8B8680] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">
              How We Support You
            </h2>
            <p className="text-lg text-[#5C5854] max-w-2xl mx-auto">
              From peer circles to school partnerships, we meet teens where they are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Peer Support Groups', desc: 'Small circles led by trained mentors who get it' },
              { title: 'Workshops & Discussions', desc: 'Learn tools for stress, identity, and difficult conversations' },
              { title: 'School Partnerships', desc: 'Bringing mental health awareness into classrooms' }
            ].map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30"
              >
                <h3 className="text-xl font-semibold text-[#2D3748] mb-3">{program.title}</h3>
                <p className="text-[#8B8680] leading-relaxed mb-4">{program.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl('Programs')}>
              <Button variant="outline" className="border-2 border-[#4A5568] text-[#4A5568] hover:bg-white px-8 py-3 rounded-xl">
                Explore All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#4A5568] rounded-3xl p-12 shadow-xl"
          >
            <Heart className="w-16 h-16 text-[#8FA58C] mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-[#FAF8F5] mb-4">
              You're Not Alone
            </h2>
            <p className="text-[#C4BFB8] text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a student seeking support, a parent looking for resources, or a school interested in partnership—we're here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('GetSupport')}>
                <Button className="bg-[#8FA58C] hover:bg-[#6B856A] text-[#FAF8F5] px-8 py-3 rounded-xl">
                  Reach Out for Support
                </Button>
              </Link>
              <Link to={createPageUrl('GetInvolved')}>
                <Button variant="outline" className="border-2 border-[#FAF8F5] text-[#FAF8F5] hover:bg-[#5A6B7D] px-8 py-3 rounded-xl">
                  Get Involved
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}