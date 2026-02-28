import React from 'react';

/**
 * BackgroundElements — fully static, zero animation.
 * Animated blobs with blur-[80-90px] were causing severe GPU lag on every page.
 * Replaced with: static colored blobs (small blur) + subtle dot grid.
 * Visual interest comes from the page layout, not background animations.
 */
export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Static soft blobs — no animation, minimal blur */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-100/60 rounded-full blur-2xl" />
      <div className="absolute top-1/3 -right-16 w-64 h-64 bg-blue-200/40 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 left-1/3 w-80 h-80 bg-slate-100/70 rounded-full blur-2xl" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
