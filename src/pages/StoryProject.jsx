import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function StoryProject() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-cyan-50 to-sky-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              The Digital{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Story Wall
              </span>
            </h1>
            <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              An online space where teens can reflect on their experiences with cultural identity, 
              academic stress, and family pressures. Share your story, explore others' perspectives, 
              and be part of a growing community that reminds us all—no one's navigating this alone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={createPageUrl('StorySharing')}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full px-10 py-6 text-lg shadow-lg shadow-blue-500/30">
                <Heart className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Story Wall Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Community Story Wall
            </h2>
            <p className="text-lg text-slate-600 mb-12">
              Story Wall results will be posted here soon.
            </p>

            {/* Blue Brick Wall */}
            <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl p-8 border-4 border-blue-300 shadow-lg">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}