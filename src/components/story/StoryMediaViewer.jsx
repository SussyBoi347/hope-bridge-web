import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Volume2, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function StoryMediaViewer({ media_urls, audio_url }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
    <>
      <div className="space-y-4">
        {/* Images */}
        {media_urls?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden bg-black/40 cursor-pointer group"
            onClick={() => setIsLightboxOpen(true)}>
            <img
              src={media_urls[currentMediaIndex]}
              alt="Story media"
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                <Image className="w-6 h-6 text-gray-900" />
              </div>
            </div>

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out">
            
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10">
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons for multiple images */}
            {media_urls.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevMedia();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all z-10">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextMedia();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all z-10">
                  <ChevronRight className="w-8 h-8" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                  {currentMediaIndex + 1} / {media_urls.length}
                </div>
              </>
            )}

            {/* Full size image */}
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={media_urls[currentMediaIndex]}
              alt="Story media full view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}