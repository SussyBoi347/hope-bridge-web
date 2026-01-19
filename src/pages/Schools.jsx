import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Heart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const benefits = [
  "Culturally responsive mental health programming",
  "Professional development for staff and counselors",
  "Peer mentor training and support",
  "Student workshops on stress, identity, and wellness",
  "Parent education sessions",
  "Ongoing consultation and resources"
];

export default function Schools() {
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              School Partnerships
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Bring culturally informed mental health support to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                your school
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Partner with Hope Bridge to provide your Asian American students with the culturally 
              responsive mental health support they need to thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                What We Offer Schools
              </h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Why Partner With Us?
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  We understand that school counselors are stretched thin. Hope Bridge complements 
                  your existing services by providing specialized support for Asian American students.
                </p>
                <p>
                  Our programs address the unique cultural pressures these students face—from academic 
                  expectations to identity struggles—in ways that traditional counseling may not.
                </p>
                <p>
                  All programs are free for schools and students, removing financial barriers to mental 
                  health support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">
              Serving Schools Across King County
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              We're proud to partner with schools throughout Sammamish and the greater Eastside, 
              bringing culturally informed mental health support to Asian American students where they are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#5B4E77] to-[#7B9AB8] rounded-2xl p-12 text-center shadow-lg"
          >
            <Heart className="w-14 h-14 text-white/90 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white mb-4">
              Start a Partnership
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how Hope Bridge can support the mental wellness of your students.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-white text-[#5B4E77] hover:bg-[#F7F5F0] px-8 py-6 text-lg rounded-full shadow-lg">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}