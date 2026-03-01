import React from 'react';

/**
 * Reusable animated background for all pages.
 * Parent must have `relative overflow-hidden`.
 */
export default function PageBackground({ variant = 'blue' }) {
  const palettes = {
    blue:   ['bg-blue-200/20',   'bg-indigo-200/18',  'bg-sky-100/25'],
    indigo: ['bg-indigo-200/22', 'bg-blue-200/18',    'bg-purple-100/20'],
    teal:   ['bg-teal-200/20',   'bg-blue-200/18',    'bg-cyan-100/25'],
  };
  const [a, b, c] = palettes[variant] ?? palettes.blue;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Animated blobs */}
      <div
        className={`page-blob absolute -top-28 -left-28 w-[420px] h-[420px] ${a} rounded-full blur-3xl`}
        style={{ animation: 'page-blob1 22s ease-in-out infinite' }}
      />
      <div
        className={`page-blob absolute top-1/2 -right-20 w-[340px] h-[340px] ${b} rounded-full blur-3xl`}
        style={{ animation: 'page-blob2 28s ease-in-out infinite' }}
      />
      <div
        className={`page-blob absolute -bottom-24 left-1/3 w-[300px] h-[300px] ${c} rounded-full blur-3xl`}
        style={{ animation: 'page-blob3 24s ease-in-out infinite' }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
