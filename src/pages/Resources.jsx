import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Library, Sparkles, User, TrendingUp, Filter, SortAsc, Users, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchBar from '../components/resources/SearchBar';
import ResourceCard from '../components/resources/ResourceCard';
import MatchingForm from '../components/matching/MatchingForm';
import MentorCard from '../components/matching/MentorCard';
import SupportGroupCard from '../components/matching/SupportGroupCard';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function FindSupportPage() {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchResults, setSearchResults] = useState(null);
  const [personalizedResults, setPersonalizedResults] = useState(null);
  const [mentorMatches, setMentorMatches] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingPersonalized, setIsLoadingPersonalized] = useState(false);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState(null);

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

  const handleFindMentors = async (profile) => {
    setIsLoadingMatches(true);
    setUserProfile(profile);
    setError(null);

    try {
      const response = await base44.functions.invoke('matchUserWithSupport', { userProfile: profile });
      setMentorMatches(response.data);
      setActiveTab('mentors');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Unable to find matches. Please try again.');
      console.error('Matching error:', err);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  const handleResetMentors = () => {
    setMentorMatches(null);
    setError(null);
  };

  // Get unique categories from resources
  const categories = [...new Set(allResources.flatMap((r) => r.categories || []))];

  // Apply filters and sorting
  const filteredAndSortedResources = allResources.
  filter((r) => selectedType === 'all' || r.type === selectedType).
  filter((r) => selectedCategory === 'all' || r.categories?.includes(selectedCategory)).
  sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.created_date) - new Date(a.created_date);
    if (sortBy === 'oldest') return new Date(a.created_date) - new Date(b.created_date);
    if (sortBy === 'popular') return (b.helpful_count || 0) - (a.helpful_count || 0);
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    return 0;
  });

  const featuredResources = allResources.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-gray-50 pt-24 pb-16 relative overflow-hidden">
      <AnimatedBackground variant="blue" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">

          



          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8">
            Find Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Perfect Support
            </span>
          </h1>
          
          <p className="text-xl text-gray-900 max-w-4xl mx-auto leading-relaxed mb-10 font-bold">Connect with mentors, join support groups, discover resources, and get personalized guidance

          </p>

          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 bg-white border-2 border-blue-300 shadow-lg p-1">
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <Library className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <Heart className="w-4 h-4 mr-2" />
              Mentors & Groups
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <Sparkles className="w-4 h-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="personalized" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <User className="w-4 h-4 mr-2" />
              For You
            </TabsTrigger>
          </TabsList>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            {/* Featured Resources */}
            {featuredResources.length > 0 &&
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>

                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-3xl font-black text-gray-900">Featured Resources</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {featuredResources.slice(0, 3).map((resource, i) =>
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}>

                      <ResourceCard resource={resource} />
                    </motion.div>
                )}
                </div>
              </motion.div>
            }

            {/* Filters & Sort */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-6 h-6 text-gray-900" />
                <span className="text-base font-black text-gray-900">Filter & Sort</span>
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
                    {categories.map((cat) =>
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    )}
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
              {isLoading ?
              <div className="col-span-full text-center py-12 text-gray-900 font-bold text-lg">
                  Loading resources...
                </div> :
              filteredAndSortedResources.length > 0 ?
              filteredAndSortedResources.map((resource, i) =>
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>

                    <ResourceCard resource={resource} />
                  </motion.div>
              ) :

              <div className="col-span-full text-center py-12 text-gray-900 font-bold text-lg">
                  No resources found. Try different filters.
                </div>
              }
            </div>
          </TabsContent>

          {/* Search Results Tab */}
          <TabsContent value="search">
            {searchResults ?
            <div className="space-y-6">
                {searchResults.search_interpretation &&
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-blue-100 border-2 border-blue-300 rounded-xl">

                    <p className="text-gray-900 font-bold text-base">
                      <strong className="text-blue-700">Understanding your search:</strong>{' '}
                      {searchResults.search_interpretation}
                    </p>
                  </motion.div>
              }
                
                <p className="text-gray-900 font-bold text-lg">
                  Found <strong className="text-blue-600">{searchResults.total_results}</strong> relevant resources
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.results.map((resource, i) =>
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}>

                      <ResourceCard resource={resource} showMatchInfo />
                    </motion.div>
                )}
                </div>
              </div> :

            <div className="text-center py-16 text-gray-900">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                <p className="font-bold text-xl">Use the search bar above to find resources with natural language</p>
              </div>
            }
          </TabsContent>

          {/* Mentors & Groups Tab */}
          <TabsContent value="mentors">
            {mentorMatches ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>

                <div className="flex justify-center mb-8">
                  <Button
                  onClick={handleResetMentors}
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-700 hover:bg-blue-50 font-bold">

                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Start New Search
                  </Button>
                </div>

                {mentorMatches.mentors && mentorMatches.mentors.length > 0 &&
              <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Your Peer Mentors</h2>
                        <p className="text-gray-900 font-bold">People who can guide and support you</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mentorMatches.mentors.map((mentor, i) =>
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}>

                          <MentorCard mentor={mentor} />
                        </motion.div>
                  )}
                    </div>
                  </div>
              }

                {mentorMatches.supportGroups && mentorMatches.supportGroups.length > 0 &&
              <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-gray-700 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Support Groups</h2>
                        <p className="text-gray-900 font-bold">Communities where you belong</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mentorMatches.supportGroups.map((group, i) =>
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}>

                          <SupportGroupCard group={group} />
                        </motion.div>
                  )}
                    </div>
                  </div>
              }

                {mentorMatches.mentors?.length === 0 && mentorMatches.supportGroups?.length === 0 &&
              <div className="text-center py-16">
                    <p className="text-gray-900 font-bold text-xl mb-4">
                      No matches found at the moment. We're continuously adding new mentors and groups!
                    </p>
                    <Button onClick={handleResetMentors} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                      Try Different Preferences
                    </Button>
                  </div>
              }
              </motion.div> :

            <div className="max-w-3xl mx-auto">
                <div className="bg-white border-2 border-blue-300 rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-3">Find Your Perfect Match</h2>
                    <p className="text-gray-900 font-bold text-lg">Tell us about yourself to connect with mentors and support groups</p>
                  </div>

                  {error &&
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-900 font-bold">
                      {error}
                    </div>
                }

                  <MatchingForm onMatch={handleFindMentors} isLoading={isLoadingMatches} />
                </div>
              </div>
            }
          </TabsContent>

          {/* Personalized Tab */}
          <TabsContent value="personalized">
            {!userProfile ?
            <div className="max-w-3xl mx-auto">
                <div className="bg-white border-2 border-blue-300 rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-3">Get Personalized Recommendations</h2>
                    <p className="text-gray-900 font-bold text-lg">Tell us about yourself to receive AI-curated resources</p>
                  </div>
                  <MatchingForm onMatch={handleGetPersonalized} isLoading={isLoadingPersonalized} />
                </div>
              </div> :
            personalizedResults ?
            <div className="space-y-6">
                {personalizedResults.strategy &&
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-blue-100 border-2 border-blue-300 rounded-xl">

                    <p className="text-gray-900 font-bold text-base">
                      <strong className="text-blue-700">Your personalized plan:</strong>{' '}
                      {personalizedResults.strategy}
                    </p>
                  </motion.div>
              }
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-bold text-lg">
                    <strong className="text-blue-600">{personalizedResults.total_recommendations}</strong> resources curated for you
                  </p>
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUserProfile(null);
                    setPersonalizedResults(null);
                  }}
                  className="border-2 border-blue-400 text-blue-700 hover:bg-blue-50 font-bold">

                    Update Profile
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {personalizedResults.recommendations.map((resource, i) =>
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}>

                      <ResourceCard resource={resource} showMatchInfo />
                    </motion.div>
                )}
                </div>
              </div> :
            null}
          </TabsContent>
        </Tabs>
      </div>
    </div>);

}