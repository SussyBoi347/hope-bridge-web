import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large decorative clouds - more visible */}
      <motion.div
        animate={{ x: [0, 150, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-20 w-96 h-48 bg-gradient-to-r from-blue-200/60 to-blue-100/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 -right-32 w-[500px] h-64 bg-gradient-to-l from-blue-300/50 to-white/60 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 25, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-80 h-40 bg-white/70 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-96 h-48 bg-gradient-to-r from-blue-100/60 to-blue-200/40 rounded-full blur-3xl"
      />
      
      {/* Floating decorative circles */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/3 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-300/25 rounded-full blur-2xl"
      />
      
      {/* Bridge design at bottom - more prominent */}
      <svg className="absolute bottom-0 left-0 w-full h-72 opacity-30" viewBox="0 0 1200 240" preserveAspectRatio="none">
        {/* Main bridge arch */}
        <path d="M0,140 Q300,40 600,140 T1200,140 L1200,240 L0,240 Z" fill="url(#bridgeGradient)" />
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Bridge cables */}
        <path d="M0,150 Q300,50 600,150 T1200,150" stroke="#1F2937" strokeWidth="4" fill="none" opacity="0.5" />
        <path d="M0,160 Q300,60 600,160 T1200,160" stroke="#374151" strokeWidth="3" fill="none" opacity="0.4" />
        
        {/* Bridge pillars - more detailed */}
        <g opacity="0.6">
          <rect x="280" y="140" width="40" height="100" fill="#1F2937" rx="4" />
          <rect x="285" y="135" width="30" height="10" fill="#374151" rx="2" />
          
          <rect x="580" y="140" width="40" height="100" fill="#1F2937" rx="4" />
          <rect x="585" y="135" width="30" height="10" fill="#374151" rx="2" />
          
          <rect x="880" y="140" width="40" height="100" fill="#1F2937" rx="4" />
          <rect x="885" y="135" width="30" height="10" fill="#374151" rx="2" />
        </g>
      </svg>
      
      {/* Decorative dots pattern */}
      <div className="absolute top-32 left-10 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            className="inline-block w-1 h-1 bg-blue-600 rounded-full mx-2 my-2"
          />
        ))}
      </div>
    </div>
  );
}