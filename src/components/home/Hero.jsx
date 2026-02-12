import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      
      {/* 4 Medium animated circles - 2 light blue, 2 grey */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left light blue circle */}
        <motion.div
          animate={{ y: [0, -35, 0], x: [0, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-40 h-40 rounded-full"
          style={{ backgroundColor: '#B3D9FF', filter: 'blur(50px)' }}
        />
        {/* Top-right grey circle */}
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-32 right-24 w-48 h-48 rounded-full"
          style={{ backgroundColor: '#D3D3D3', filter: 'blur(55px)' }}
        />
        {/* Bottom-left light blue circle */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-32 left-32 w-44 h-44 rounded-full"
          style={{ backgroundColor: '#ADD8E6', filter: 'blur(50px)' }}
        />
        {/* Bottom-right grey circle */}
        <motion.div
          animate={{ y: [0, 35, 0], x: [0, -28, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-40 right-32 w-52 h-52 rounded-full"
          style={{ backgroundColor: '#E0E0E0', filter: 'blur(55px)' }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 rounded-full border-2 border-blue-500 text-blue-600 text-sm font-semibold bg-white/80 backdrop-blur-sm">
              Supporting Asian Teen Mental Health
            </span>
          </motion.div>

          {/* Main title with 3D effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[1.1] mb-4 tracking-tight"
            style={{
              color: '#3B82F6',
              textShadow: '4px 4px 0px #60A5FA, 8px 8px 0px #93C5FD',
              WebkitTextStroke: '2px #2563EB',
              paintOrder: 'stroke fill',
            }}
          >
            Hopebridge
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
          >
            Building Bridges to Brighter Futures!
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            A safe space for Asian teens to share experiences, find support, and connect 
            with others who understand the unique challenges of navigating identity, 
            family expectations, and mental health.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 1 }} 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection('contact')} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-6 text-lg shadow-lg transition-all duration-300"
              >
                Get Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection('mission')} 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-900 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-full px-10 py-6 text-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}