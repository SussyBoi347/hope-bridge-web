import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-sky-50/40" />
      
      {/* Floating abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/25 to-sky-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-300/15 via-sky-200/10 to-cyan-300/15 blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 text-sm font-medium mb-8">
              <Heart className="w-4 h-4" />
              Supporting Asian Teen Mental Health
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-slate-900 leading-[1.1] tracking-tight"
          >
            Every teen deserves
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              space to be heard
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl"
          >
            Hope Bridge creates safe spaces for Asian teens navigating academic pressure, 
            cultural expectations, and identity. We're building a community where mental 
            health conversations are welcomed, not silenced.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button 
              onClick={() => scrollToSection('get-involved')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/35"
            >
              Get Support
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection('partnerships')}
              className="border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 px-8 py-6 text-base rounded-full transition-all"
            >
              Partner With Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-slate-100"
          >
            <p className="text-sm text-slate-500 mb-4">Trusted by communities across</p>
            <div className="flex flex-wrap gap-8 items-center text-slate-400">
              <span className="text-sm font-medium tracking-wide">Washington Schools</span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="text-sm font-medium tracking-wide">Community Centers</span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="text-sm font-medium tracking-wide">Asian American Families</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}