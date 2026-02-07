import React from 'react';
import { motion } from 'framer-motion';

export default function BridgeVisualization() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-blue-950 via-slate-900 to-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Building Bridges Together
          </h2>
          <p className="text-cyan-300 mt-4 text-lg">Connecting pathways to wellness</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(0,217,255,0.4)]"
          >
            {/* Background perspective grid */}
            <defs>
              <linearGradient id="bridgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 217, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Road markings - perspective lines */}
            <line x1="500" y1="150" x2="250" y2="320" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="2" strokeDasharray="10,10" />
            <line x1="500" y1="150" x2="750" y2="320" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="2" strokeDasharray="10,10" />

            {/* Top Lane - Hope Bridge */}
            <rect x="100" y="100" width="800" height="100" fill="url(#bridgeGlow)" rx="10" filter="url(#glow)" />
            
            {/* Top lane suspension cables */}
            <line x1="200" y1="100" x2="200" y2="60" stroke="rgba(0, 217, 255, 0.6)" strokeWidth="3" />
            <line x1="400" y1="100" x2="400" y2="40" stroke="rgba(0, 217, 255, 0.6)" strokeWidth="3" />
            <line x1="600" y1="100" x2="600" y2="40" stroke="rgba(0, 217, 255, 0.6)" strokeWidth="3" />
            <line x1="800" y1="100" x2="800" y2="60" stroke="rgba(0, 217, 255, 0.6)" strokeWidth="3" />

            {/* Top bridge towers */}
            <rect x="180" y="30" width="40" height="70" fill="rgba(0, 217, 255, 0.4)" filter="url(#glow)" />
            <rect x="780" y="30" width="40" height="70" fill="rgba(0, 217, 255, 0.4)" filter="url(#glow)" />

            {/* Top lane LED lights */}
            {[150, 250, 350, 450, 550, 650, 750, 850].map((x) => (
              <motion.circle
                key={`top-${x}`}
                cx={x}
                cy="150"
                r="6"
                fill="rgba(0, 217, 255, 0.8)"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: x / 500, repeat: Infinity }}
                filter="url(#glow)"
              />
            ))}

            {/* Bottom Lane - Building Bridges to Brighter Futures */}
            <rect x="100" y="250" width="800" height="100" fill="url(#bridgeGlow)" rx="10" filter="url(#glow)" />

            {/* Bottom lane suspension cables */}
            <line x1="200" y1="350" x2="200" y2="390" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3" />
            <line x1="400" y1="350" x2="400" y2="410" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3" />
            <line x1="600" y1="350" x2="600" y2="410" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3" />
            <line x1="800" y1="350" x2="800" y2="390" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3" />

            {/* Bottom bridge towers */}
            <rect x="180" y="360" width="40" height="70" fill="rgba(59, 130, 246, 0.4)" filter="url(#glow)" />
            <rect x="780" y="360" width="40" height="70" fill="rgba(59, 130, 246, 0.4)" filter="url(#glow)" />

            {/* Bottom lane LED lights */}
            {[150, 250, 350, 450, 550, 650, 750, 850].map((x) => (
              <motion.circle
                key={`bottom-${x}`}
                cx={x}
                cy="300"
                r="6"
                fill="rgba(59, 130, 246, 0.8)"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: x / 500, repeat: Infinity }}
                filter="url(#glow)"
              />
            ))}

            {/* Connecting cables between lanes */}
            {[200, 400, 600, 800].map((x) => (
              <line key={`cable-${x}`} x1={x} y1="100" x2={x} y2="250" stroke="rgba(0, 217, 255, 0.3)" strokeWidth="2" />
            ))}

            {/* Top label text */}
            <text x="500" y="160" textAnchor="middle" fontSize="28" fontWeight="bold" fill="rgba(255, 255, 255, 0.9)" fontFamily="Arial, sans-serif">
              Hope Bridge
            </text>

            {/* Bottom label text */}
            <text x="500" y="310" textAnchor="middle" fontSize="24" fontWeight="bold" fill="rgba(255, 255, 255, 0.85)" fontFamily="Arial, sans-serif">
              Building Bridges to Brighter Futures
            </text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/70 mt-8 text-lg"
        >
          Two pathways connected with purpose—creating safe spaces and pathways to wellness.
        </motion.p>
      </div>
    </section>
  );
}