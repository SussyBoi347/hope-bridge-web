import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoryMediaViewer({ media_urls, audio_url }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  if (!media_urls?.length && !audio_url) {
    return null;
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % (media_urls?.length || 1));
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + (media_urls?.length || 1)) % (media_urls?.length || 1));
  };

  return (
    <div className="space-y-4">
      {/* Images */}
      {media_urls?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden bg-black/40">
          <img
            src={media_urls[currentMediaIndex]}
            alt="Story media"
            className="w-full h-64 object-cover"
          />

          {/* Media counter and navigation */}
          {media_urls.length > 1 && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {currentMediaIndex + 1} / {media_urls.length}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Audio */}
      {audio_url && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-white font-medium mb-2">Audio Story</p>
            <audio controls className="w-full h-8">
              <source src={audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </motion.div>
      )}
    </div>
  );
}