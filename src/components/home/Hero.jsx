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
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(0,217,255,0.2)]">
              Supporting Asian Teen Mental Health
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Your story
            <br />
            <span className="text-gray-400 text-xl sm:text-xl lg:text-xl">Building Bridges to Brighter Futures.</span>
            <br />
            <span className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl">You are not alone</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            A safe space for Asian teens to share experiences, find support, and connect 
            with others who understand the unique challenges of navigating identity, 
            family expectations, and mental health.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button onClick={() => scrollToSection('contact')} size="lg" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-full px-10 py-7 text-lg shadow-[0_0_40px_rgba(0,217,255,0.5)] hover:shadow-[0_0_60px_rgba(0,217,255,0.8)] transition-all duration-300 hover:scale-105 border border-cyan-400/50">
              Get Support
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button onClick={() => scrollToSection('mission')} size="lg" variant="outline" className="border-2 border-cyan-500/30 hover:border-cyan-400 bg-transparent text-white hover:bg-cyan-500/10 rounded-full px-10 py-7 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>