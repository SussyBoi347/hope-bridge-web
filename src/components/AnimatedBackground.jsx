import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground({ variant = 'blue' }) {
  const colors = {
    blue: {
      bg: 'from-blue-50 via-slate-50 to-gray-50',
      circles: ['bg-blue-200/30', 'bg-slate-300/25', 'bg-blue-100/40', 'bg-gray-200/35']
    },
    purple: {
      bg: 'from-purple-50 via-pink-50 to-blue-50',
      circles: ['bg-purple-200/30', 'bg-pink-300/25', 'bg-blue-100/40', 'bg-purple-100/35']
    },
    warm: {
      bg: 'from-orange-50 via-yellow-50 to-pink-50',
      circles: ['bg-orange-200/30', 'bg-yellow-300/25', 'bg-pink-100/40', 'bg-orange-100/35']
    },
    cool: {
      bg: 'from-cyan-50 via-blue-50 to-teal-50',
      circles: ['bg-cyan-200/30', 'bg-blue-300/25', 'bg-teal-100/40', 'bg-cyan-100/35']
    }
  };

  const theme = colors[variant] || colors.blue;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-10 left-10 w-96 h-96 ${theme.circles[0]} rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -35, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className={`absolute top-20 right-20 w-80 h-80 ${theme.circles[1]} rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ y: [0, -45, 0], x: [0, 25, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className={`absolute bottom-20 left-1/4 w-[28rem] h-[28rem] ${theme.circles[2]} rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ y: [0, 55, 0], x: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        className={`absolute bottom-32 right-16 w-96 h-96 ${theme.circles[3]} rounded-full blur-3xl`}
      />

      {/* Medium circles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`med-${i}`}
          animate={{ 
            y: [0, -60 - i * 8, 0],
            x: [0, 40 + i * 6, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 18 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 1.2
          }}
          className={`absolute rounded-full blur-2xl ${theme.circles[i % 4]}`}
          style={{
            width: `${100 + i * 25}px`,
            height: `${100 + i * 25}px`,
            left: `${8 + i * 10}%`,
            top: `${12 + i * 7}%`,
          }}
        />
      ))}

      {/* Small bouncing circles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sm-${i}`}
          animate={{ 
            y: [0, -50 - i * 4, 0],
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.4, 1]
          }}
          transition={{ 
            duration: 5 + i * 0.6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.4
          }}
          className={`absolute rounded-full ${theme.circles[i % 4].replace('/30', '/40').replace('/25', '/35')}`}
          style={{
            width: `${35 + i * 10}px`,
            height: `${35 + i * 10}px`,
            left: `${4 + i * 6.5}%`,
            top: `${18 + i * 5.5}%`,
          }}
        />
      ))}

      {/* Tiny floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`tiny-${i}`}
          animate={{ 
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 8 + i * 0.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.3
          }}
          className={`absolute rounded-full ${theme.circles[i % 4].replace('/30', '/50')}`}
          style={{
            width: `${15 + i * 3}px`,
            height: `${15 + i * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Bridge design at bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-96 opacity-50" viewBox="0 0 1200 280" preserveAspectRatio="none">
        <path d="M0,160 Q300,50 600,160 T1200,160 L1200,280 L0,280 Z" fill="url(#bridgeGradient)" />
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        <path d="M0,170 Q300,60 600,170 T1200,170" stroke="#1F2937" strokeWidth="5" fill="none" opacity="0.5" />
        
        <g opacity="0.6">
          <rect x="270" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
          <rect x="570" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
          <rect x="870" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
        </g>
      </svg>
    </div>
  );
}