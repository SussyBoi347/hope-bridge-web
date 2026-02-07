import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const topicColors = {
  cultural_identity: 'bg-purple-100 text-purple-800',
  academic_stress: 'bg-blue-100 text-blue-800',
  family_pressures: 'bg-pink-100 text-pink-800'
};

const topicLabels = {
  cultural_identity: 'Cultural Identity',
  academic_stress: 'Academic Stress',
  family_pressures: 'Family Pressures'
};

export default function StoryCard({ story, onLike, isLiked }) {
  const [showComments, setShowComments] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const topicGradients = {
    cultural_identity: 'from-purple-500 to-pink-500',
    academic_stress: 'from-blue-500 to-cyan-500',
    family_pressures: 'from-pink-500 to-rose-500'
  };

  const topicBg = {
    cultural_identity: 'bg-gradient-to-br from-purple-900/40 to-pink-900/40',
    academic_stress: 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40',
    family_pressures: 'bg-gradient-to-br from-pink-900/40 to-rose-900/40'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all ${topicBg[story.topic]} ${isHovered ? 'border-white/30 shadow-2xl shadow-purple-500/20' : 'border-white/10'}`}>
      
      {/* Gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${topicGradients[story.topic]}`} />

      {/* Header */}
      <div className="relative p-6 border-b border-white/10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{story.title}</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                {story.author_name.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-gray-300">{story.author_name}</p>
            </div>
          </div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${topicGradients[story.topic]} text-white shadow-lg`}>
            {topicLabels[story.topic]}
          </motion.span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
          <Calendar className="w-3 h-3" />
          {format(new Date(story.created_date), 'MMM d, yyyy')}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-5">
        <p className="text-gray-200 leading-relaxed line-clamp-4">{story.content}</p>
      </div>

      {/* Actions */}
      <div className="relative px-6 py-4 border-t border-white/10 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            isLiked 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}>
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          <span className="text-sm font-semibold">{story.likes}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 transition-all">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">{story.comments_count}</span>
        </motion.button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 py-4 bg-black/30 border-t border-white/10">
          <p className="text-sm text-gray-400">💬 Comments feature coming soon</p>
        </motion.div>
      )}
    </motion.div>
  );
}