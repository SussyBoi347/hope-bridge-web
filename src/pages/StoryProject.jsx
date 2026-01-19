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
      setLikedStories(prev => prev.filter(id => id !== storyId));
      await base44.entities.Story.update(storyId, { likes: Math.max(0, stories.find(s => s.id === storyId).likes - 1) });
    } else {
      setLikedStories(prev => [...prev, storyId]);
      const story = stories.find(s => s.id === storyId);
      await base44.entities.Story.update(storyId, { likes: story.likes + 1 });
    }
  }, [likedStories, stories]);

  const filteredStories = selectedTopic
    ? stories.filter(s => s.topic === selectedTopic)
    : stories;

  const featuredStories = stories.filter(s => s.featured).slice(0, 2);
  const allOtherStories = filteredStories.filter(s => !s.featured);

  const stats = {
    total: stories.length,
    topTopic: stories.reduce((acc, s) => {
      acc[s.topic] = (acc[s.topic] || 0) + 1;
      return acc;
    }, {}) | Object.entries({ ...Object.entries(stories.reduce((acc, s) => {
      acc[s.topic] = (acc[s.topic] || 0) + 1;
      return acc;
    }, {})).sort(([,a], [,b]) => b - a) }).length > 0 ? Object.entries(stories.reduce((acc, s) => {
      acc[s.topic] = (acc[s.topic] || 0) + 1;
      return acc;
    }, {})).sort(([,a], [,b]) => b - a)[0][0] : 'N/A',
    totalLikes: stories.reduce((sum, s) => sum + s.likes, 0),
    totalComments: stories.reduce((sum, s) => sum + s.comments_count, 0)
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-cyan-50 to-sky-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              The Digital{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Story Wall
              </span>
            </h1>
            <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              An online space where teens can reflect on their experiences with cultural identity, 
              academic stress, and family pressures. Share your story, explore others' perspectives, 
              and be part of a growing community that reminds us all—no one's navigating this alone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border-2 border-blue-200 p-10 lg:p-14 text-center shadow-lg"
          >
            <h1 className="text-3xl lg:text-4xl font-semibold text-blue-900 mb-4">
              Share Your Experience
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              Your voice matters. Click below to share your story about cultural identity, family 
              disconnect, or academic pressures.
            </p>
            <Link to={createPageUrl('StorySharing')}>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-10 py-3 text-lg font-medium shadow-lg">
                ✏️ Share Your Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Story Wall Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* Insights */}
          <StoryInsights stats={stats} />

          {/* Featured Stories */}
          {featuredStories.length > 0 && (
            <FeaturedStories
              stories={featuredStories}
              onLike={handleLike}
              likedStories={likedStories}
            />
          )}

          {/* Filters and All Stories */}
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-8">All Stories</h2>
            <StoryFilters selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-600">Loading stories...</p>
              </div>
            ) : allOtherStories.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allOtherStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onLike={handleLike}
                    isLiked={likedStories.includes(story.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No stories yet for this topic. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}