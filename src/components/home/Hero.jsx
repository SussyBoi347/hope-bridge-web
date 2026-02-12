import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 via-yellow-50 to-pink-50">
      
      {/* Animated floating circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 25}px`,
              height: `${60 + i * 25}px`,
              left: `${(i * 8) % 95}%`,
              top: `${(i * 10) % 85}%`,
              background: [
                'linear-gradient(135deg, #FFB340 0%, #FF8C42 100%)',
                'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)',
                'linear-gradient(135deg, #F472B6 0%, #FB923C 100%)',
                'linear-gradient(135deg, #FCA5A5 0%, #FDA4AF 100%)',
              ][i % 4],
              opacity: 0.25,
              filter: 'blur(25px)',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 50, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Bouncing decorative circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 w-16 h-16 bg-orange-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute top-40 right-20 w-12 h-12 bg-yellow-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 left-20 w-14 h-14 bg-pink-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -35, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-40 right-32 w-10 h-10 bg-orange-300 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -28, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-35"
      />
      <motion.div
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 2.5 }}
        className="absolute top-1/3 right-1/3 w-18 h-18 bg-pink-300 rounded-full opacity-35"
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="mb-8"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png" 
              alt="Hope Bridge" 
              className="w-32 h-32 mx-auto"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(255, 179, 64, 0.5))' }}
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-black leading-[1.05] mb-6 tracking-tight"
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255,179,64,0.3)',
                  '0 0 40px rgba(255,179,64,0.5)',
                  '0 0 20px rgba(255,179,64,0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-gray-900"
            >
              Hope Bridge
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-4"
          >
            Building Bridges to Brighter Futures
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl sm:text-3xl text-gray-800 font-semibold mb-8"
          >
            Supporting Asian Teen Mental Health
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
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
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 3 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity } }}
            >
              <Button 
                onClick={() => scrollToSection('contact')} 
                size="lg" 
                className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black rounded-full px-14 py-9 text-2xl shadow-[0_10px_40px_rgba(255,179,64,0.4)] hover:shadow-[0_15px_50px_rgba(255,179,64,0.6)] transition-all duration-300 border-4 border-orange-300"
              >
                Get Support
                <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: -3 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity, delay: 0.3 } }}
            >
              <Button 
                onClick={() => scrollToSection('mission')} 
                size="lg" 
                variant="outline" 
                className="border-4 border-yellow-500 hover:border-yellow-600 bg-white hover:bg-yellow-50 text-yellow-700 font-black rounded-full px-14 py-9 text-2xl shadow-[0_10px_40px_rgba(251,191,36,0.3)] hover:shadow-[0_15px_50px_rgba(251,191,36,0.5)] transition-all duration-300"
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