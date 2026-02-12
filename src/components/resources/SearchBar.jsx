import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    "How to deal with academic pressure",
    "Managing family expectations",
    "Building cultural identity",
    "Coping with anxiety"
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... e.g., 'How do I talk to my parents about mental health?'"
            className="w-full pl-12 pr-32 py-6 text-lg bg-white/10 border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-400">Try:</span>
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="text-xs px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}