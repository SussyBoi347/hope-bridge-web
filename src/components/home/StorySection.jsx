import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import CountUp from '../CountUp';

export default function StorySection() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Share Your Story
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Read real stories, find community, connect with others who understand.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 max-w-2xl mx-auto mb-10 border-t border-white/20 border-b border-white/20 py-8">
            <div>
              <CountUp value="200+" className="text-3xl font-bold block" />
              <div className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Stories shared</div>
            </div>
            <div>
              <CountUp value="100+" className="text-3xl font-bold block" />
              <div className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Teens connected</div>
            </div>
            <div>
              <CountUp value="100%" className="text-3xl font-bold block" />
              <div className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Safe & secure</div>
            </div>
          </div>

          <Link to={createPageUrl('StoryProject')}>
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold text-base hover:bg-blue-50 transition-colors duration-200 shadow-md">
              Explore Stories
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}