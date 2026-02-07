import React from 'react';
import { motion } from 'framer-motion';

export default function BridgeHero() {
  return (
    <div className="relative w-full h-96 bg-transparent overflow-hidden flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* SVG Bridge - Top Down View */}
      <svg
        viewBox="0 0 1200 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 217, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0.05)" />
          </linearGradient>
          
          <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#0088CC" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>

        {/* Bridge deck background */}
        <rect width="1200" height="400" fill="url(#bridgeGradient)" />

        {/* Main bridge structure */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Left tower */}
          <line x1="250" y1="80" x2="250" y2="320" stroke="#00D9FF" strokeWidth="12" opacity="0.8" />
          <circle cx="250" cy="80" r="20" fill="#00D9FF" opacity="0.6" />

          {/* Right tower */}
          <line x1="950" y1="80" x2="950" y2="320" stroke="#00D9FF" strokeWidth="12" opacity="0.8" />
          <circle cx="950" cy="80" r="20" fill="#00D9FF" opacity="0.6" />

          {/* Main bridge span */}
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#0088CC" strokeWidth="80" opacity="0.3" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="url(#cableGradient)" strokeWidth="60" opacity="0.6" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#00FFF0" strokeWidth="20" opacity="0.8" />

          {/* Top lane (HopeBridge) */}
          <line x1="0" y1="170" x2="1200" y2="170" stroke="#00D9FF" strokeWidth="3" opacity="0.5" strokeDasharray="10,10" />
          
          {/* Bottom lane (Building Bridges) */}
          <line x1="0" y1="230" x2="1200" y2="230" stroke="#00D9FF" strokeWidth="3" opacity="0.5" strokeDasharray="10,10" />

          {/* Lane dividers */}
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#00FFF0" strokeWidth="2" opacity="0.4" />

          {/* Cable suspensions - Left side */}
          {[0, 100, 200, 250].map((x, i) => (
            <line
              key={`cable-left-${i}`}
              x1={250 - (250 - x)}
              y1="100"
              x2={250 - (250 - x)}
              y2="200"
              stroke="#00D9FF"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}

          {/* Cable suspensions - Right side */}
          {[0, 100, 200, 250].map((x, i) => (
            <line
              key={`cable-right-${i}`}
              x1={950 + x}
              y1="100"
              x2={950 + x}
              y2="200"
              stroke="#00D9FF"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}

          {/* Connecting cables arc - Left */}
          <path
            d="M 250 100 Q 400 50 600 100"
            stroke="#00D9FF"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />

          {/* Connecting cables arc - Right */}
          <path
            d="M 600 100 Q 800 50 950 100"
            stroke="#00D9FF"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
        </motion.g>

        {/* Text - Top lane (HopeBridge) */}
        <motion.text
          x="600"
          y="165"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="700"
          fill="#00FFF0"
          opacity="0.9"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-bold"
        >
          HopeBridge
        </motion.text>

        {/* Text - Bottom lane (Building Bridges) */}
        <motion.text
          x="600"
          y="240"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="600"
          fill="#00D9FF"
          opacity="0.8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building Bridges to Brighter Futures
        </motion.text>
      </svg>

      {/* Glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}