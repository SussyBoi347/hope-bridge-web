import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Library, Sparkles, User, TrendingUp, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchBar from '../components/resources/SearchBar';
import ResourceCard from '../components/resources/ResourceCard';
import MatchingForm from '../components/matching/MatchingForm';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchResults, setSearchResults] = useState(null);
  const [personalizedResults, setPersonalizedResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingPersonalized, setIsLoadingPersonalized] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch all resources
  const { data: allResources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.Resource.list('-created_date'),
    initialData: []
  });

  const handleSearch = async (query) => {
    setIsSearching(true);
    setActiveTab('search');
    
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
    setActiveTab('personalized');
    
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

  // Get unique categories from resources
  const categories = [...new Set(allResources.flatMap(r => r.categories || []))];

  // Apply filters and sorting
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium border border-blue-200 mb-6">
            <Library className="w-4 h-4" />
            AI-Powered Resource Library
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Perfect Resources
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Search naturally, discover personalized content, and access expert guides 
            tailored to your unique journey.
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-white border border-blue-200">
            <TabsTrigger value="browse" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Library className="w-4 h-4 mr-2" />
              Browse All
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Search Results
            </TabsTrigger>
            <TabsTrigger value="personalized" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              For You
            </TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-8">
            {/* Featured Resources */}
            {featuredResources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

            {/* Filters & Sort */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Filter & Sort</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Type Filter */}
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white border-blue-200 text-gray-900">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="guide">Guides</SelectItem>
                    <SelectItem value="tool">Tools</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="worksheet">Worksheets</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white border-blue-200 text-gray-900">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Age Filter */}
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="bg-white border-blue-200 text-gray-900">
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="13-15">13-15 years</SelectItem>
                    <SelectItem value="16-18">16-18 years</SelectItem>
                    <SelectItem value="19+">19+ years</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white border-blue-200 text-gray-900">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Helpful</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* All Resources */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-12 text-gray-600">
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
                <div className="col-span-full text-center py-12 text-gray-600">
                  No resources found. Try different filters.
                </div>
              )}
            </div>
          </TabsContent>

          {/* Search Results Tab */}
          <TabsContent value="search">
            {searchResults ? (
              <div className="space-y-6">
                {searchResults.search_interpretation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <p className="text-blue-900">
                      <strong className="text-blue-600">Understanding your search:</strong>{' '}
                      {searchResults.search_interpretation}
                    </p>
                  </motion.div>
                )}
                
                <p className="text-gray-600">
                  Found <strong className="text-gray-900">{searchResults.total_results}</strong> relevant resources
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-center py-16 text-gray-600">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Use the search bar above to find resources with natural language</p>
              </div>
            )}
          </TabsContent>

          {/* Personalized Tab */}
          <TabsContent value="personalized">
            {!userProfile ? (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white border border-blue-200 rounded-3xl p-8 lg:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Personalized Recommendations</h2>
                    <p className="text-gray-600">Tell us about yourself to receive AI-curated resources</p>
                  </div>
                  <MatchingForm onMatch={handleGetPersonalized} isLoading={isLoadingPersonalized} />
                </div>
              </div>
            ) : personalizedResults ? (
              <div className="space-y-6">
                {personalizedResults.strategy && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <p className="text-blue-900">
                      <strong className="text-blue-600">Your personalized plan:</strong>{' '}
                      {personalizedResults.strategy}
                    </p>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    <strong className="text-gray-900">{personalizedResults.total_recommendations}</strong> resources curated for you
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUserProfile(null);
                      setPersonalizedResults(null);
                    }}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Update Profile
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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