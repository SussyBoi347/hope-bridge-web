import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)]" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Share Your Story
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Through the Story Project, teens share real experiences with cultural identity, academic pressures, and family dynamics. Read inspiring stories, find community, and connect with others who understand your journey.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-300">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-xs text-gray-300">Stories shared</div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-gray-300">Teens connected</div>
            </div>
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
              <Lightbulb className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-gray-300">Safe & secure</div>
            </div>
          </div>

          <Link to={createPageUrl('StoryProject')}>
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black rounded-full font-bold text-lg shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:shadow-[0_0_50px_rgba(0,217,255,0.8)] hover:scale-105 transition-all duration-300 border border-cyan-400/50">
              Explore Stories
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}