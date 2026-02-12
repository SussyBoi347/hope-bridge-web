import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      
      {/* 3D-style floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${(i * 12) % 90}%`,
              top: `${(i * 15) % 80}%`,
              background: [
                'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
                'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
              ][i % 4],
              opacity: 0.15,
              filter: 'blur(40px)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Large animated gradient orbs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-400 rounded-full filter blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-[130px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-blue-300 rounded-full filter blur-[140px]"
        />
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-blue-400' : 'bg-blue-600'}`}
          style={{
            width: i % 5 === 0 ? '4px' : '2px',
            height: i % 5 === 0 ? '4px' : '2px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: i % 5 === 0 ? '0 0 10px currentColor' : '0 0 6px currentColor',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, i % 5 === 0 ? 2 : 1.2, 0.8]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="mb-8"
          >
            <motion.span 
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(59,130,246,0.3)',
                  '0 0 40px rgba(59,130,246,0.5)',
                  '0 0 20px rgba(59,130,246,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-100 text-blue-700 text-base font-bold border-2 border-blue-300 shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Supporting Asian Teen Mental Health
            </motion.span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-black leading-[1.05] mb-8 tracking-tight"
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 30px rgba(59,130,246,0.3)',
                  '0 0 50px rgba(59,130,246,0.5)',
                  '0 0 30px rgba(59,130,246,0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-gray-900"
            >
              Your story
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-blue-600 text-2xl sm:text-2xl lg:text-3xl font-bold"
            >
              Building Bridges to Brighter Futures.
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl"
            >
              You are not alone
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-14 leading-relaxed font-semibold"
          >
            A safe space for Asian teens to share experiences, find support, and connect 
            with others who understand the unique challenges of navigating identity, 
            family expectations, and mental health.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 1.2 }} 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.08, rotate: 1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('contact')} 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-black rounded-full px-12 py-8 text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10 flex items-center">
                  Get Support
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08, rotate: -1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('mission')} 
                size="lg" 
                variant="outline" 
                className="border-4 border-blue-600 hover:border-blue-500 bg-white hover:bg-blue-50 text-blue-600 font-black rounded-full px-12 py-8 text-xl shadow-2xl transition-all duration-300"
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