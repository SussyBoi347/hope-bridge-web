import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Users, Heart, Library, User, TrendingUp, Filter, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MatchingForm from '../components/matching/MatchingForm';
import MentorCard from '../components/matching/MentorCard';
import SupportGroupCard from '../components/matching/SupportGroupCard';
import SearchBar from '../components/resources/SearchBar';
import ResourceCard from '../components/resources/ResourceCard';
import BackgroundElements from '@/components/BackgroundElements';
import ThreeDScene from '@/components/ThreeDScene';

export default function FindSupport() {
  const [activeTab, setActiveTab] = useState('matching');
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [personalizedResults, setPersonalizedResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingPersonalized, setIsLoadingPersonalized] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch all resources
  const { data: allResources = [], isLoading: isLoadingResources } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.Resource.list('-created_date'),
    initialData: []
  });

  const handleMatch = async (userProfile) => {
    setIsLoading(true);
    
    try {
      const response = await base44.functions.invoke('matchUserWithSupport', { userProfile });
      setMatches(response.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Matching error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    setActiveTab('resources');
    
    try {
      const response = await base44.functions.invoke('searchResources', { 
        query,
        filters: { 
          type: selectedType !== 'all' ? selectedType : null,
          category: selectedCategory !== 'all' ? selectedCategory : null
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGetPersonalized = async (profile) => {
    setIsLoadingPersonalized(true);
    setUserProfile(profile);
    
    try {
      const response = await base44.functions.invoke('getPersonalizedResources', { 
        userProfile: profile 
      });
      setPersonalizedResults(response.data);
    } catch (error) {
      console.error('Personalization error:', error);
    } finally {
      setIsLoadingPersonalized(false);
    }
  };

  const categories = [...new Set(allResources.flatMap(r => r.categories || []))];

  const filteredAndSortedResources = allResources
    .filter(r => selectedType === 'all' || r.type === selectedType)
    .filter(r => selectedCategory === 'all' || r.categories?.includes(selectedCategory))
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_date) - new Date(a.created_date);
      if (sortBy === 'oldest') return new Date(a.created_date) - new Date(b.created_date);
      if (sortBy === 'popular') return (b.helpful_count || 0) - (a.helpful_count || 0);
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      return 0;
    });

  const featuredResources = allResources.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 pt-24 pb-16 relative overflow-hidden">
      <ThreeDScene />
      <BackgroundElements />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/30 backdrop-blur-sm border-2 border-blue-400 text-white text-base font-bold mb-8">
            <Sparkles className="w-5 h-5" />
            AI-Powered Support & Resources
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 drop-shadow-2xl">
            Find Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Support
            </span>
          </h1>
          
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-lg">
            Connect with peer mentors, join support groups, and access resources 
            tailored to your unique journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 p-2 rounded-2xl">
            <TabsTrigger 
              value="matching" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white text-white font-bold rounded-xl py-3"
            >
              <Users className="w-5 h-5 mr-2" />
              Find Mentors
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white text-white font-bold rounded-xl py-3"
            >
              <Library className="w-5 h-5 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="personalized" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white text-white font-bold rounded-xl py-3"
            >
              <User className="w-5 h-5 mr-2" />
              For You
            </TabsTrigger>
          </TabsList>

          {/* Matching Tab */}
          <TabsContent value="matching">
            <AnimatePresence mode="wait">
              {matches ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-center mb-10">
                    <Button
                      onClick={() => setMatches(null)}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-8 py-6 rounded-full text-lg shadow-2xl"
                    >
                      New Search
                    </Button>
                  </div>

                  {matches.mentors && matches.mentors.length > 0 && (
                    <div className="mb-16">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                          <Heart className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-4xl font-black text-white drop-shadow-lg">Your Peer Mentors</h2>
                          <p className="text-blue-200 text-lg font-semibold">People who can guide and support you</p>
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matches.mentors.map((mentor, i) => (
                          <motion.div
                            key={mentor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <MentorCard mentor={mentor} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matches.supportGroups && matches.supportGroups.length > 0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-gray-600 flex items-center justify-center shadow-2xl">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-4xl font-black text-white drop-shadow-lg">Support Groups</h2>
                          <p className="text-blue-200 text-lg font-semibold">Communities where you belong</p>
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matches.supportGroups.map((group, i) => (
                          <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <SupportGroupCard group={group} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 rounded-3xl p-10 lg:p-16 shadow-2xl">
                    <div className="text-center mb-10">
                      <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">Tell Us About Yourself</h2>
                      <p className="text-blue-200 text-xl font-semibold">Help us understand how we can best support you</p>
                    </div>

                    <MatchingForm onMatch={handleMatch} isLoading={isLoading} variant="dark" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-10">
            <div className="max-w-3xl mx-auto mb-10">
              <SearchBar onSearch={handleSearch} isLoading={isSearching} />
            </div>

            {searchResults ? (
              <div className="space-y-8">
                {searchResults.search_interpretation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-blue-500/20 backdrop-blur-sm border-2 border-blue-400 rounded-2xl"
                  >
                    <p className="text-white font-semibold text-lg">
                      <strong className="text-blue-300">Understanding your search:</strong>{' '}
                      {searchResults.search_interpretation}
                    </p>
                  </motion.div>
                )}
                
                <p className="text-blue-200 font-bold text-xl">
                  Found <strong className="text-white">{searchResults.total_results}</strong> relevant resources
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.results.map((resource, i) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ResourceCard resource={resource} showMatchInfo />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {featuredResources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <TrendingUp className="w-7 h-7 text-blue-400" />
                      <h2 className="text-3xl font-black text-white drop-shadow-lg">Featured Resources</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      {featuredResources.slice(0, 3).map((resource, i) => (
                        <motion.div
                          key={resource.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <ResourceCard resource={resource} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Filter className="w-6 h-6 text-blue-400" />
                    <span className="text-lg font-black text-white drop-shadow-lg">Filter & Sort</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 text-white font-bold">
                        <SelectValue placeholder="Resource Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-blue-500 text-white">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="article">Articles</SelectItem>
                        <SelectItem value="guide">Guides</SelectItem>
                        <SelectItem value="tool">Tools</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="worksheet">Worksheets</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 text-white font-bold">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-blue-500 text-white">
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 text-white font-bold">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-blue-500 text-white">
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Helpful</SelectItem>
                        <SelectItem value="views">Most Viewed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {isLoadingResources ? (
                    <div className="col-span-full text-center py-12 text-blue-200 font-bold text-xl">
                      Loading resources...
                    </div>
                  ) : filteredAndSortedResources.length > 0 ? (
                    filteredAndSortedResources.map((resource, i) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <ResourceCard resource={resource} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-blue-200 font-bold text-xl">
                      No resources found. Try different filters.
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* Personalized Tab */}
          <TabsContent value="personalized">
            {!userProfile ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 rounded-3xl p-10 lg:p-16 shadow-2xl">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">Get Personalized Recommendations</h2>
                    <p className="text-blue-200 text-xl font-semibold">Tell us about yourself to receive AI-curated resources</p>
                  </div>
                  <MatchingForm onMatch={handleGetPersonalized} isLoading={isLoadingPersonalized} variant="dark" />
                </div>
              </div>
            ) : personalizedResults ? (
              <div className="space-y-8">
                {personalizedResults.strategy && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-blue-500/20 backdrop-blur-sm border-2 border-blue-400 rounded-2xl"
                  >
                    <p className="text-white font-semibold text-lg">
                      <strong className="text-blue-300">Your personalized plan:</strong>{' '}
                      {personalizedResults.strategy}
                    </p>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-blue-200 font-bold text-xl">
                    <strong className="text-white">{personalizedResults.total_recommendations}</strong> resources curated for you
                  </p>
                  <Button
                    onClick={() => {
                      setUserProfile(null);
                      setPersonalizedResults(null);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold"
                  >
                    Update Profile
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {personalizedResults.recommendations.map((resource, i) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ResourceCard resource={resource} showMatchInfo />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}