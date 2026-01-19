import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

export default function StoryProjectSection() {
  return (
    <section id="story-project" className="py-24 lg:py-32 bg-gradient-to-b from-cyan-100 via-teal-50 to-sky-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            Share Your Story
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            Your story <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">matters</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            The Story Project is a safe space where Asian teens can share their experiences with academic pressure, cultural identity, family relationships, and mental health. Your story can inspire others and help break the stigma around these conversations.
          </p>
          <div className="mt-10">
            <Link to={createPageUrl('StoryProject')}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue-500/25">
                Explore Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}