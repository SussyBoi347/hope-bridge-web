import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users as UsersIcon } from 'lucide-react';

export default function StoryInsights({ stats }) {
  const insights = [
    {
      icon: UsersIcon,
      label: 'Total Stories Shared',
      value: stats.total,
      gradient: 'from-cyan-500 to-blue-600',
      iconColor: 'text-cyan-300'
    },
    {
      icon: TrendingUp,
      label: 'Most Popular Topic',
      value: stats.topTopic,
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-cyan-300'
    },
    {
      icon: BarChart3,
      label: 'Community Engagement',
      value: stats.totalLikes + stats.totalComments,
      gradient: 'from-blue-600 to-cyan-600',
      iconColor: 'text-blue-300'
    }
  ];

  return (
    <div className="mb-20">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white mb-10">
        📊 Community Insights
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all shadow-xl">
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-10`} />
              
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}>
                  <Icon className={`w-12 h-12 mb-4 ${insight.iconColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                </motion.div>
                <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">{insight.label}</p>
                <motion.p
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}
                  className={`text-5xl font-bold bg-gradient-to-r ${insight.gradient} bg-clip-text text-transparent`}>
                  {insight.value}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}