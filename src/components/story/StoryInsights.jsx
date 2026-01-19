import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users as UsersIcon } from 'lucide-react';

export default function StoryInsights({ stats }) {
  const insights = [
    {
      icon: UsersIcon,
      label: 'Total Stories Shared',
      value: stats.total,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Most Popular Topic',
      value: stats.topTopic,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: BarChart3,
      label: 'Community Engagement',
      value: stats.totalLikes + stats.totalComments,
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-slate-900 mb-8"
      >
        Community Insights
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${insight.color} rounded-lg p-6`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <p className="text-sm font-medium opacity-75">{insight.label}</p>
              <p className="text-3xl font-bold mt-2">{insight.value}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}