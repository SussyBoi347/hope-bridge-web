import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StoryCard from './StoryCard';

export default function FeaturedStories({ stories, onLike, likedStories }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <Sparkles className="w-6 h-6 text-yellow-500" />
        <h2 className="text-3xl font-semibold text-slate-900">Featured Stories</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onLike={onLike}
            isLiked={likedStories.includes(story.id)}
          />
        ))}
      </div>
    </div>
  );
}