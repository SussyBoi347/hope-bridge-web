import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large decorative clouds - MUCH more visible */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 15, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-[450px] h-56 bg-gradient-to-r from-blue-300/70 to-blue-200/60 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-[550px] h-72 bg-gradient-to-l from-blue-400/60 to-blue-300/50 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 25, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-[400px] h-52 bg-blue-200/80 rounded-full blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -90, 0], y: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/5 w-[500px] h-64 bg-gradient-to-r from-blue-300/70 to-blue-400/50 rounded-full blur-[130px]"
      />
      
      {/* Smaller accent clouds */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 right-1/3 w-64 h-32 bg-blue-200/60 rounded-full blur-[80px]"
      />
      
      {/* Floating decorative circles - more prominent */}
      <motion.div
        animate={{ y: [0, -40, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-48 h-48 bg-blue-500/30 rounded-full blur-[60px]"
      />
      <motion.div
        animate={{ y: [0, 50, 0], scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-blue-400/35 rounded-full blur-[70px]"
      />
      
      {/* Prominent bridge design at bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-80 opacity-50" viewBox="0 0 1200 280" preserveAspectRatio="none">
        {/* Main bridge arch - more visible */}
        <path d="M0,160 Q300,50 600,160 T1200,160 L1200,280 L0,280 Z" fill="url(#bridgeGradient)" />
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Bridge cables - more visible */}
        <path d="M0,170 Q300,60 600,170 T1200,170" stroke="#1F2937" strokeWidth="6" fill="none" opacity="0.7" />
        <path d="M0,180 Q300,70 600,180 T1200,180" stroke="#374151" strokeWidth="5" fill="none" opacity="0.6" />
        <path d="M0,190 Q300,80 600,190 T1200,190" stroke="#4B5563" strokeWidth="4" fill="none" opacity="0.5" />
        
        {/* Bridge pillars - more prominent and detailed */}
        <g opacity="0.8">
          {/* Left pillar */}
          <rect x="270" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
          <rect x="275" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
          <rect x="280" y="170" width="40" height="4" fill="#4B5563" opacity="0.6" />
          
          {/* Middle pillar */}
          <rect x="570" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
          <rect x="575" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
          <rect x="580" y="170" width="40" height="4" fill="#4B5563" opacity="0.6" />
          
          {/* Right pillar */}
          <rect x="870" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
          <rect x="875" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
          <rect x="880" y="170" width="40" height="4" fill="#4B5563" opacity="0.6" />
        </g>
        
        {/* Vertical support cables */}
        {[300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900].map(x => (
          <line key={x} x1={x} y1={Math.abs(Math.sin(x/100) * 50) + 170} x2={x} y2="280" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
        ))}
      </svg>
      
      {/* Decorative dots pattern - more visible */}
      <div className="absolute top-40 left-16 opacity-40">
        <div className="grid grid-cols-5 gap-3">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-40 right-16 opacity-40">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}