import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Partnerships from '@/components/home/Partnerships';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Mission />
      <Problem />
      <CommunitySurvey />
      <Impact />
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Whether you're a student seeking support, a parent wanting to learn more, or someone passionate about mental health, there are meaningful ways to get involved.
            </p>
            <Link to={createPageUrl('GetInvolved')}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue-500/25">
                Explore Ways to Get Involved
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Partnerships />
      <Contact />
      <Footer />
    </div>
  );
}