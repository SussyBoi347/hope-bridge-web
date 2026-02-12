import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import CommentsSection from './CommentsSection';
import StoryMediaViewer from './StoryMediaViewer';

const topicColors = {
  cultural_identity: 'bg-blue-100 text-blue-800',
  academic_stress: 'bg-blue-100 text-blue-800',
  family_pressures: 'bg-gray-100 text-gray-800'
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
    cultural_identity: 'from-blue-600 to-blue-500',
    academic_stress: 'from-blue-500 to-gray-600',
    family_pressures: 'from-blue-600 to-gray-600'
  };

  const topicBg = {
    cultural_identity: 'bg-white',
    academic_stress: 'bg-white',
    family_pressures: 'bg-white'
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
      className={`relative overflow-hidden rounded-2xl border transition-all ${topicBg[story.topic]} ${isHovered ? 'border-blue-400 shadow-xl' : 'border-blue-200'}`}>

      {/* Header */}
      <div className="relative p-6 border-b border-blue-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight break-words">{story.title}</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                {story.author_name.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-gray-600 truncate">{story.author_name}</p>
            </div>
          </div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${topicGradients[story.topic]} text-white shadow-md whitespace-nowrap ml-2`}>
            {topicLabels[story.topic]}
          </motion.span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
          <Calendar className="w-3 h-3" />
          {format(new Date(story.created_date), 'MMM d, yyyy')}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-5 space-y-4">
        {/* AI Summary */}
        {story.summary && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-blue-600 font-medium mb-1">AI Summary</p>
                <p className="text-sm text-gray-700 leading-relaxed break-words">{story.summary}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-gray-700 leading-relaxed line-clamp-4 break-words">{story.content}</p>

        {/* AI Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 text-xs">
                #{tag.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {(story.media_urls?.length > 0 || story.audio_url) && (
        <div className="relative px-6 py-4 border-t border-blue-100">
          <StoryMediaViewer media_urls={story.media_urls} audio_url={story.audio_url} />
        </div>
      )}

      {/* Actions */}
      <div className="relative px-6 py-4 border-t border-blue-100 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            isLiked 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          <span className="text-sm font-semibold">{story.likes}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">{story.comments_count}</span>
        </motion.button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentsSection storyId={story.id} commentsCount={story.comments_count} />
      )}
    </motion.div>
  );
}