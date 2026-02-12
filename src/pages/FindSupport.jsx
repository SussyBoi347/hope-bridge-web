import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Sparkles, Users, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchingForm from '../components/matching/MatchingForm';
import MentorCard from '../components/matching/MentorCard';
import SupportGroupCard from '../components/matching/SupportGroupCard';

export default function FindSupport() {
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatch = async (userProfile) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await base44.functions.invoke('matchUserWithSupport', { userProfile });
      setMatches(response.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Unable to find matches. Please try again.');
      console.error('Matching error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMatches(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Matching
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Perfect Match
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with peer mentors and support groups who understand your journey. 
            Our AI considers your unique challenges, interests, and needs to find the best matches for you.
          </p>
        </motion.div>

        {/* Results View */}
        <AnimatePresence mode="wait">
          {matches ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Start New Search
                </Button>
              </div>

              {/* Mentors Section */}
              {matches.mentors && matches.mentors.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Your Peer Mentors</h2>
                      <p className="text-gray-400 text-sm">People who can guide and support you</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.mentors.map((mentor) => (
                      <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                  </div>
                </div>
              )}

              {/* Support Groups Section */}
              {matches.supportGroups && matches.supportGroups.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Support Groups</h2>
                      <p className="text-gray-400 text-sm">Communities where you belong</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.supportGroups.map((group) => (
                      <SupportGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                </div>
              )}

              {matches.mentors?.length === 0 && matches.supportGroups?.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg mb-4">
                    No matches found at the moment. We're continuously adding new mentors and groups!
                  </p>
                  <Button onClick={handleReset} className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30">
                    Try Different Preferences
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Form View */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_rgba(0,217,255,0.1)]">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Yourself</h2>
                  <p className="text-gray-400">Help us understand how we can best support you</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <MatchingForm onMatch={handleMatch} isLoading={isLoading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}