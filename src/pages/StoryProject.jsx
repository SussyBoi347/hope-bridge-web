import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { Camera, Loader2, CheckCircle2, AlertCircle, Upload, Pen } from 'lucide-react';
import StoryFilters from '@/components/story/StoryFilters';
import StoryCard from '@/components/story/StoryCard';
import FeaturedStories from '@/components/story/FeaturedStories';
import StoryInsights from '@/components/story/StoryInsights';
import StorySearchFilters from '@/components/story/StorySearchFilters';
import BackgroundElements from '@/components/BackgroundElements';

export default function StoryProject() {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [likedStories, setLikedStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadMode, setUploadMode] = useState(null); // 'photo' or null
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Load stories
  useEffect(() => {
    const loadStories = async () => {
      try {
        const allStories = await base44.entities.Story.filter({ status: 'approved' }, '-created_date');
        setStories(allStories);
        setFilteredStories(allStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStories();
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError('');
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle photo upload
  const handlePhotoSubmit = async () => {
    if (!selectedFile) {
      setUploadError('Please select an image');
      return;
    }

    setIsAnalyzing(true);
    setUploadError('');
    try {
      const uploadResponse = await base44.integrations.Core.UploadFile({
        file: selectedFile
      });

      const response = await base44.functions.invoke('analyzePhysicalStory', {
        image_url: uploadResponse.file_url
      });

      if (response.data.success) {
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadMode(null);
          setUploadSuccess(false);
          setSelectedFile(null);
          setPreview(null);
          // Reload stories
          base44.entities.Story.filter({ status: 'approved' }, '-created_date').then(allStories => {
            setStories(allStories);
            setFilteredStories(allStories);
          });
        }, 2000);
      } else {
        setUploadError(response.data.error || 'Failed to analyze image');
      }
    } catch (err) {
      setUploadError(err.message || 'Failed to process image');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

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

  const topicFilteredStories = selectedTopic ?
  filteredStories.filter((s) => s.topic === selectedTopic) :
  filteredStories;

  const featuredStories = stories.filter((s) => s.featured).slice(0, 2);
  const allOtherStories = topicFilteredStories.filter((s) => !s.featured);

  const topicCounts = stories.reduce((acc, s) => {
    acc[s.topic] = (acc[s.topic] || 0) + 1;
    return acc;
  }, {});
  
  const topTopicEntry = Object.entries(topicCounts).sort(([, a], [, b]) => b - a)[0];
  
  const stats = {
    total: stories.length,
    topTopic: topTopicEntry ? topTopicEntry[0] : 'N/A',
    totalLikes: stories.reduce((sum, s) => sum + s.likes, 0),
    totalComments: stories.reduce((sum, s) => sum + s.comments_count, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <BackgroundElements />
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
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-sm font-medium">
                Community Story Wall
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
              Your Voice,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Your Story
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A vibrant space where Asian teens share authentic experiences with cultural identity, academic pressures, and family dynamics. Every story matters. Every voice counts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-8 justify-center text-center">
              {[
                { num: '200+', label: 'Stories Shared' },
                { num: '100%', label: 'Anonymous & Safe' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="px-6 py-4 rounded-2xl bg-white border border-blue-200 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">{stat.num}</div>
                  <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {uploadMode === 'photo' ? (
            /* Photo Upload Form */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-blue-200 rounded-2xl p-8 shadow-lg">
              
              {uploadSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Story Added!</h3>
                  <p className="text-gray-300">Your story has been captured and shared with the community.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Upload Story Photo</h2>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setUploadMode(null);
                        setSelectedFile(null);
                        setPreview(null);
                        setUploadError('');
                      }}
                      className="text-gray-900">
                      Cancel
                    </Button>
                  </div>

                  {uploadError && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-red-300 text-sm">{uploadError}</p>
                    </div>
                  )}

                  {preview && (
                    <div className="mb-6">
                      <img src={preview} alt="Preview" className="w-full rounded-lg max-h-64 object-cover border border-cyan-500/30" />
                    </div>
                  )}

                  <label className="block mb-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isAnalyzing}
                    />
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                      <Camera className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-gray-900 font-medium">
                        {selectedFile ? selectedFile.name : 'Take a photo or upload'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Tap to capture or choose from gallery</p>
                    </div>
                  </label>

                  <Button
                    onClick={handlePhotoSubmit}
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full py-3 font-semibold">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      'Add Story'
                    )}
                  </Button>

                  <p className="text-xs text-gray-600 mt-4 text-center">
                    The AI will automatically extract the story text from your photo.
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            /* Share Options */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl">
              
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
              
              <div className="relative z-10 p-10 lg:p-16 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mb-6">
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
                  className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setUploadMode('photo')}
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-full px-8 py-6 text-lg shadow-2xl">
                    <Camera className="w-5 h-5 mr-2" />
                    Upload Photo Story
                  </Button>
                  <Link to={createPageUrl('StorySharing')}>
                    <Button className="bg-white/10 hover:bg-white/20 text-white border-2 border-white font-bold rounded-full px-8 py-6 text-lg">
                      <Pen className="w-5 h-5 mr-2" />
                      Write Story Online
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
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
              className="text-4xl font-bold text-gray-900 mb-10">
              Explore Stories
            </motion.h2>
            
            <StorySearchFilters stories={stories} onFiltersChange={setFilteredStories} />
            <StoryFilters selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />

            {isLoading ?
            <div className="text-center py-12">
                <p className="text-gray-600">Loading stories...</p>
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
                <p className="text-gray-600">Your story project submissions will be showcased here in our story wall! Story Project launching January 20th!</p>
              </div>
            }
          </div>


          </div>
          </section>

          {/* Digital Brick Wall */}
          <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16">
           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
             Your Story Builds Our Wall
           </h2>
           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
             Every story shared is a brick in our community wall of resilience
           </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-4">
           {[...Array(32)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.8, rotateZ: (Math.random() - 0.5) * 10 }}
               whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: i * 0.03 }}
               whileHover={{ scale: 1.05, rotateZ: (Math.random() - 0.5) * 5 }}
               className={`aspect-square rounded-lg border-2 shadow-lg cursor-pointer transition-all ${
                 [
                   'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400',
                   'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300',
                   'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-500',
                   'bg-gradient-to-br from-blue-700 to-gray-700 border-blue-500'
                 ][i % 4]
               }`}>
             </motion.div>
           ))}
          </div>

          <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="text-center text-gray-600 text-sm mt-12">
           Each brick represents the courage it takes to share your story. Together, we're building a wall of hope.
          </motion.p>
          </div>
          </section>
          </div>);

          }