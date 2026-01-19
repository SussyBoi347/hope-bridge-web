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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{story.title}</h3>
            <p className="text-sm text-slate-500 mt-1">by {story.author_name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${topicColors[story.topic]}`}>
            {topicLabels[story.topic]}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3 h-3" />
          {format(new Date(story.created_date), 'MMM d, yyyy')}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="text-slate-700 leading-relaxed line-clamp-4">{story.content}</p>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : 'text-slate-600'}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600' : ''}`} />
          <span className="text-sm">{story.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-slate-600"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{story.comments_count}</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-sm text-slate-600">Comments feature coming soon</p>
        </div>
      )}
    </motion.div>
  );
}