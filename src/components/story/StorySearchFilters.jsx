import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function StorySearchFilters({ stories, onFiltersChange }) {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const applyFilters = () => {
    const filtered = stories.filter((story) => {
      const matchesKeyword = keyword === '' ||
      story.title.toLowerCase().includes(keyword.toLowerCase()) ||
      story.content.toLowerCase().includes(keyword.toLowerCase());

      const storyDate = new Date(story.created_date);
      const matchesStartDate = startDate === '' || storyDate >= new Date(startDate);
      const matchesEndDate = endDate === '' || storyDate <= new Date(endDate);

      return matchesKeyword && matchesStartDate && matchesEndDate;
    });

    onFiltersChange(filtered);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleReset = () => {
    setKeyword('');
    setStartDate('');
    setEndDate('');
    onFiltersChange(stories);
  };

  React.useEffect(() => {
    applyFilters();
  }, [startDate, endDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 space-y-4">
      
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search stories by title or content..."
              className="bg-white text-gray-900 pl-12 pr-4 h-11 w-full rounded-full border border-gray-200 shadow-sm text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-300 transition-colors" />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-11 font-semibold">
            Search
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date Filter */}
        <div>
          <label className="text-gray-700 mb-2 text-xs font-semibold block">From Date</label>
          <div className="relative">
            <Calendar className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white text-gray-900 pl-10 px-4 py-2 text-sm rounded-lg w-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 transition-colors" />
          </div>
        </div>

        {/* End Date Filter */}
        <div>
          <label className="text-gray-700 mb-2 text-xs font-semibold block">To Date</label>
          <div className="relative">
            <Calendar className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white text-gray-900 pl-10 px-4 py-2 text-sm rounded-lg w-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 transition-colors" />


          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(keyword || startDate || endDate) &&
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end">
          <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-full gap-2 text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </motion.div>
      }
    </motion.div>);

}