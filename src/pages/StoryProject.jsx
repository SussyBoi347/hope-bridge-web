import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import StoryFilters from '@/components/story/StoryFilters';
import StoryCard from '@/components/story/StoryCard';
import FeaturedStories from '@/components/story/FeaturedStories';
import StoryInsights from '@/components/story/StoryInsights';

export default function StoryProject() {
  const [stories, setStories] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [likedStories, setLikedStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load stories
  useEffect(() => {
    const loadStories = async () => {
      try {
        const allStories = await base44.entities.Story.filter({ status: 'approved' }, '-created_date');
        setStories(allStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStories();
  }, []);

  // Handle like
  const handleLike = useCallback(async (storyId) => {
    const sessionId = localStorage.getItem('userSessionId') || Math.random().toString(36);
    if (!localStorage.getItem('userSessionId')) {
      localStorage.setItem('userSessionId', sessionId);
    }

    if (likedStories.includes(storyId)) {
      setLikedStories((prev) => prev.filter((id) => id !== storyId));
      await base44.entities.Story.update(storyId, { likes: Math.max(0, stories.find((s) => s.id === storyId).likes - 1) });
    } else {
      setLikedStories((prev) => [...prev, storyId]);
      const story = stories.find((s) => s.id === storyId);
      await base44.entities.Story.update(storyId, { likes: story.likes + 1 });
    }
  }, [likedStories, stories]);

  const filteredStories = selectedTopic ?
  stories.filter((s) => s.topic === selectedTopic) :
  stories;

  const featuredStories = stories.filter((s) => s.featured).slice(0, 2);
  const allOtherStories = filteredStories.filter((s) => !s.featured);

  const stats = {
    total: stories.length,
    topTopic: stories.reduce((acc, s) => {
      acc[s.topic] = (acc[s.topic] || 0) + 1;
      return acc;
    }, {}) | Object.entries({ ...Object.entries(stories.reduce((acc, s) => {
        acc[s.topic] = (acc[s.topic] || 0) + 1;
        return acc;
      }, {})).sort(([, a], [, b]) => b - a) }).length > 0 ? Object.entries(stories.reduce((acc, s) => {
      acc[s.topic] = (acc[s.topic] || 0) + 1;
      return acc;
    }, {})).sort(([, a], [, b]) => b - a)[0][0] : 'N/A',
    totalLikes: stories.reduce((sum, s) => sum + s.likes, 0),
    totalComments: stories.reduce((sum, s) => sum + s.comments_count, 0)
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
        <div className="absolute top-40 right-[15%] w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[30%] w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-[25%] w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[110px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-200 text-sm font-medium shadow-[0_0_30px_rgba(0,217,255,0.3)]">
                Community Story Wall
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
              Your Voice,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                Your Story
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A vibrant space where Asian teens share authentic experiences with cultural identity, academic pressures, and family dynamics. Every story matters. Every voice counts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-8 justify-center text-center">
              {[
                { num: stories.length, label: 'Stories Shared' },
                { num: stories.reduce((sum, s) => sum + s.likes, 0), label: 'Hearts Given' },
                { num: '100%', label: 'Anonymous & Safe' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-cyan-900/40 backdrop-blur-md border border-cyan-500/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{stat.num}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl">
            
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            
            {/* Content */}
            <div className="relative z-10 p-10 lg:p-16 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6">
                <span className="text-6xl">✍️</span>
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Story Matters
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                Be heard. Be seen. Be part of something bigger. Share your experience and help others feel less alone.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link to={createPageUrl('StorySharing')}>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-full px-12 py-6 text-lg shadow-2xl shadow-black/40 hover:shadow-white/20 transition-all">
                     Share Your Story Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Story Wall Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Insights */}
          <StoryInsights stats={stats} />

          {/* Featured Stories */}
          {featuredStories.length > 0 &&
          <FeaturedStories
            stories={featuredStories}
            onLike={handleLike}
            likedStories={likedStories} />

          }

          {/* Filters and All Stories */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-10">
              Explore Stories
            </motion.h2>
            <StoryFilters selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />

            {isLoading ?
            <div className="text-center py-12">
                <p className="text-gray-300">Loading stories...</p>
              </div> :
            allOtherStories.length > 0 ?
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allOtherStories.map((story) =>
              <StoryCard
                key={story.id}
                story={story}
                onLike={handleLike}
                isLiked={likedStories.includes(story.id)} />

              )}
              </div> :

            <div className="text-center py-12">
                <p className="text-gray-300">Your story project submissions will be showcased here in our story wall! Story Project launching January 20th!</p>
              </div>
            }
          </div>

          
        </div>
      </section>
    </div>);

}