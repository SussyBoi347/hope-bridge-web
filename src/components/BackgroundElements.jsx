import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated clouds */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-32 h-16 bg-white/40 rounded-full blur-xl"
      />
      <motion.div
        animate={{ x: [0, -80, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 w-40 h-20 bg-blue-100/40 rounded-full blur-xl"
      />
      <motion.div
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-60 left-1/3 w-36 h-18 bg-white/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 right-10 w-48 h-24 bg-blue-50/40 rounded-full blur-xl"
      />
      
      {/* Subtle bridge design using SVG curves */}
      <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,100 Q300,20 600,100 T1200,100 L1200,200 L0,200 Z" fill="#3B82F6" />
        <path d="M0,120 Q300,40 600,120 T1200,120" stroke="#1F2937" strokeWidth="3" fill="none" />
        {/* Bridge pillars */}
        <rect x="290" y="100" width="20" height="100" fill="#1F2937" opacity="0.6" />
        <rect x="590" y="100" width="20" height="100" fill="#1F2937" opacity="0.6" />
        <rect x="890" y="100" width="20" height="100" fill="#1F2937" opacity="0.6" />
      </svg>
    </div>
  );
}