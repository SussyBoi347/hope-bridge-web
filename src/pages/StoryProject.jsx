import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';

export default function StoryProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-cyan-50 via-blue-50 to-sky-50">
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

      {/* Share Your Experience Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border-2 border-blue-200 p-10 lg:p-14 text-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-blue-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              Your voice matters. Click below to share your story about cultural identity, family 
              disconnect, or academic pressures.
            </p>
            <Link to={createPageUrl('StorySharing')}>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-10 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                ✏️ Share Your Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Story Wall Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Community Story Wall
            </h2>
            <p className="text-lg text-slate-600">
              Story Wall results will be posted here soon.
            </p>
          </motion.div>

          {/* Realistic Interconnected Brick Wall */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-cyan-200 via-blue-100 to-cyan-100 rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-1">
              {[...Array(6)].map((_, row) => (
                <div key={row} className="flex gap-1" style={{ marginLeft: row % 2 === 1 ? '50%' : '0' }}>
                  {[...Array(row % 2 === 1 ? 4 : 8)].map((_, col) => (
                    <motion.div
                      key={`${row}-${col}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (row * 4 + col) * 0.03, duration: 0.4 }}
                      className="flex-1 h-16 bg-gradient-to-br from-cyan-300 via-blue-200 to-cyan-300 rounded-sm shadow-sm hover:shadow-md hover:scale-105 transition-all border border-cyan-400/50 cursor-pointer"
                      style={{
                        boxShadow: 'inset -2px -2px 3px rgba(0,0,0,0.15), inset 2px 2px 3px rgba(255,255,255,0.6), -1px 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}