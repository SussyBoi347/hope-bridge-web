import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Playful floating shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-[15%] w-24 h-24 bg-pink-400 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-[20%] w-40 h-40 bg-purple-400 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-[25%] w-28 h-28 bg-teal-400 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
        
        {/* Stars and decorative elements */}
        <div className="absolute top-[30%] left-[5%] text-6xl animate-pulse" style={{ animationDuration: '2s' }}>⭐</div>
        <div className="absolute top-[60%] right-[10%] text-5xl animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-[30%] left-[15%] text-4xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>💫</div>
        <div className="absolute top-[20%] right-[30%] text-5xl animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '0.3s' }}>🌟</div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-orange-600 text-sm font-bold border-4 border-orange-400 shadow-lg">
              💙 Supporting Asian Teen Mental Health
            </span>
          </motion.div>

          <h1 className="leading-[1.1] mb-8">
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="block text-7xl sm:text-8xl lg:text-9xl font-black mb-6"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700,
                color: '#FF6B9D',
                textShadow: '4px 4px 0px #FFB340, 8px 8px 0px #4ECDC4',
                transform: 'rotate(-2deg)'
              }}
            >
              Hopebridge
            </motion.span>
            <span className="block text-gray-700 text-3xl sm:text-4xl lg:text-5xl font-bold mt-6" style={{ fontFamily: "'Fredoka', sans-serif" }}>Building Bridges to Brighter Futures! 🌈</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            A safe space for Asian teens to share experiences, find support, and connect 
            with others who understand the unique challenges of navigating identity, 
            family expectations, and mental health.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button onClick={() => scrollToSection('contact')} size="lg" className="group bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-300 hover:to-pink-400 text-white font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-2 border-4 border-white">
              Get Support 🚀
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>

            <Button onClick={() => scrollToSection('mission')} size="lg" variant="outline" className="border-4 border-purple-400 hover:border-purple-500 bg-white text-purple-600 hover:bg-purple-50 rounded-full px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-110 hover:-rotate-2 shadow-lg">
              Learn More ✨
            </Button>
          </motion.div>
        </motion.div>
      </div>