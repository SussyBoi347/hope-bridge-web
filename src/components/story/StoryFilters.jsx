import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen, Users } from 'lucide-react';

const topics = [
{ id: 'cultural_identity', label: 'Cultural Identity', icon: Users },
{ id: 'academic_stress', label: 'Academic Stress', icon: BookOpen },
{ id: 'family_pressures', label: 'Family Pressures', icon: Heart }];


export default function StoryFilters({ selectedTopic, onTopicChange }) {
  const topicGradients = {
    cultural_identity: 'from-cyan-500 to-blue-600',
    academic_stress: 'from-blue-500 to-cyan-500',
    family_pressures: 'from-blue-600 to-cyan-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-4 mb-12">
      
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTopicChange(null)}
        className={`px-6 py-3 rounded-xl font-bold transition-all ${
        selectedTopic === null ?
        'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white shadow-xl shadow-cyan-500/30' :
        'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'}`
        }>
         All Stories
      </motion.button>

      {topics.map((topic) => {
        const Icon = topic.icon;
        return (
          <motion.button
            key={topic.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTopicChange(topic.id)} className="bg-white/10 text-slate-950 px-6 py-3 font-bold rounded-xl flex items-center gap-2 transition-all hover:bg-white/20 border border-white/20">





            <Icon className="w-5 h-5" />
            {topic.label}
          </motion.button>);

      })}
    </motion.div>);

}