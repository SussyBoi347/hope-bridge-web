import React from 'react';

const themes = {
  blue: {
    blobs: [
      'bg-blue-200/25',
      'bg-slate-300/20',
      'bg-blue-100/30',
    ]
  },
  purple: {
    blobs: [
      'bg-purple-200/25',
      'bg-pink-200/20',
      'bg-blue-100/30',
    ]
  },
  warm: {
    blobs: [
      'bg-orange-200/25',
      'bg-yellow-200/20',
      'bg-pink-100/30',
    ]
  },
  cool: {
    blobs: [
      'bg-cyan-200/25',
      'bg-blue-200/20',
      'bg-teal-100/30',
    ]
  }
};

export default function AnimatedBackground({ variant = 'blue' }) {
  const theme = themes[variant] || themes.blue;

  return (
    <>
      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(40px, -30px, 0) scale(1.05); }
          66% { transform: translate3d(-20px, 20px, 0) scale(0.95); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-50px, 40px, 0) scale(1.08); }
          66% { transform: translate3d(30px, -15px, 0) scale(0.97); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(35px, 25px, 0) scale(1.04); }
        }
        .anim-blob {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`anim-blob absolute top-10 left-10 w-96 h-96 ${theme.blobs[0]} rounded-full blur-3xl`}
          style={{ animation: 'drift1 20s ease-in-out infinite' }}
        />
        <div
          className={`anim-blob absolute top-20 right-20 w-80 h-80 ${theme.blobs[1]} rounded-full blur-3xl`}
          style={{ animation: 'drift2 25s ease-in-out infinite' }}
        />
        <div
          className={`anim-blob absolute bottom-20 left-1/4 w-[28rem] h-[28rem] ${theme.blobs[2]} rounded-full blur-3xl`}
          style={{ animation: 'drift3 22s ease-in-out infinite' }}
        />
      </div>
    </>
  );
}
