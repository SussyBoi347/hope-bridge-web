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
import Contact from '@/components/home/Contact';
import StorySection from '@/components/home/StorySection';

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
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
              Share Your Story
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-slate-900 mb-4">
              Your story matters
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Through the Story Project, teens share their real experiences with cultural identity, academic pressures, and family dynamics. Read inspiring stories, find community, and connect with others who understand your journey.
            </p>
            <Link to={createPageUrl('StoryProject')}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue-500/25">
                Explore Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Partnerships />
      <Contact />
    </div>
  );
}