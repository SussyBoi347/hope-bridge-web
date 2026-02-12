import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function StorySearchFilters({ stories, onFiltersChange }) {
  const [keyword, setKeyword] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const uniqueAuthors = [...new Set(stories.map((s) => s.author_name))].sort();

  const applyFilters = () => {
    const filtered = stories.filter((story) => {
      const matchesKeyword = keyword === '' ||
      story.title.toLowerCase().includes(keyword.toLowerCase()) ||
      story.content.toLowerCase().includes(keyword.toLowerCase());

      const matchesAuthor = selectedAuthor === '' || story.author_name === selectedAuthor;

      const storyDate = new Date(story.created_date);
      const matchesStartDate = startDate === '' || storyDate >= new Date(startDate);
      const matchesEndDate = endDate === '' || storyDate <= new Date(endDate);

      return matchesKeyword && matchesAuthor && matchesStartDate && matchesEndDate;
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
    setSelectedAuthor('');
    setStartDate('');
    setEndDate('');
    onFiltersChange(stories);
  };

  React.useEffect(() => {
    applyFilters();
  }, [selectedAuthor, startDate, endDate]);

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
              className="pl-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-8 hover:from-cyan-400 hover:to-blue-400">
            Search
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Author Filter */}
        <div>
          <label className="text-slate-950 mb-2 text-xs font-semibold block">Author</label>
          <select
             value={selectedAuthor}
             onChange={(e) => setSelectedAuthor(e.target.value)}
             className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-2 text-sm appearance-none cursor-pointer">
             <option value="">All Authors</option>
             {uniqueAuthors.map(author => (
               <option key={author} value={author}>{author}</option>
             ))}
          </select>
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="text-slate-950 mb-2 text-xs font-semibold block">From Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input
               type="date"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-2 pl-10 text-sm"
             />

          </div>
        </div>

        {/* End Date Filter */}
        <div>
          <label className="text-slate-950 mb-2 text-xs font-semibold block">To Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input
               type="date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
               className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-2 pl-10 text-sm"
             />

          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(keyword || selectedAuthor || startDate || endDate) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-full gap-2 text-white border-white/30 hover:bg-white/10">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </motion.div>
      )}
      </motion.div>
      );
      }