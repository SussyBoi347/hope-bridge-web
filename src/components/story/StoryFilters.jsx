import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen, Users } from 'lucide-react';

const topics = [
  { id: 'cultural_identity', label: 'Cultural Identity', icon: Users },
  { id: 'academic_stress', label: 'Academic Stress', icon: BookOpen },
  { id: 'family_pressures', label: 'Family Pressures', icon: Heart }
];

export default function StoryFilters({ selectedTopic, onTopicChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 mb-8"
    >
      <Button
        onClick={() => onTopicChange(null)}
        variant={selectedTopic === null ? 'default' : 'outline'}
        className={selectedTopic === null ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        All Stories
      </Button>
      {topics.map((topic) => {
        const Icon = topic.icon;
        return (
          <Button
            key={topic.id}
            onClick={() => onTopicChange(topic.id)}
            variant={selectedTopic === topic.id ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${selectedTopic === topic.id ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <Icon className="w-4 h-4" />
            {topic.label}
          </Button>
        );
      })}
    </motion.div>
  );
}