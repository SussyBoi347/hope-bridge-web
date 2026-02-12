import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Wrench, Clock, Star, ExternalLink, ThumbsUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const typeIcons = {
  article: BookOpen,
  guide: FileText,
  tool: Wrench,
  video: Video,
  worksheet: FileText
};

const typeColors = {
  article: 'from-blue-600 to-blue-500',
  guide: 'from-blue-700 to-blue-600',
  tool: 'from-blue-600 to-gray-600',
  video: 'from-blue-500 to-gray-500',
  worksheet: 'from-gray-700 to-gray-600'
};

export default function ResourceCard({ resource, showMatchInfo = false }) {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const Icon = typeIcons[resource.type] || BookOpen;

  const generateSummary = async () => {
    setIsLoadingSummary(true);
    setShowSummary(true);
    try {
      // Simulated AI summary - in production, call actual AI function
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSummary(`This ${resource.type} focuses on ${resource.categories?.join(', ')}. ${resource.description}`);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl h-full flex flex-col group">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeColors[resource.type]} flex items-center justify-center shadow-md`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            {resource.relevance_score && (
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                <span className="text-blue-600 text-xs font-semibold">
                  {Math.round(resource.relevance_score)}%
                </span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{resource.description}</p>
        </CardHeader>

        <CardContent className="flex-grow space-y-3">
          {showMatchInfo && (resource.match_reason || resource.recommendation_reason) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-xs text-blue-900">
                <strong className="text-blue-600">Why this matches:</strong>{' '}
                {resource.match_reason || resource.recommendation_reason}
              </p>
            </motion.div>
          )}

          {showSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              {isLoadingSummary ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-xs">Generating AI summary...</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600 font-semibold">AI Summary</span>
                  </div>
                  <p className="text-xs text-gray-700">{summary}</p>
                </div>
              )}
            </motion.div>
          )}

          <div>
            <p className="text-xs text-gray-500 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {resource.categories.map((cat, i) => (
                <Badge key={i} variant="outline" className="border-blue-200 text-gray-700 text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {resource.reading_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{resource.reading_time} min</span>
              </div>
            )}
            <Badge variant="outline" className="border-gray-300 text-gray-600 text-xs capitalize">
              {resource.difficulty_level}
            </Badge>
            {resource.helpful_count > 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                <span>{resource.helpful_count}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="space-y-2">
          {!showSummary && (
            <Button
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 text-xs"
              onClick={generateSummary}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              AI Summary
            </Button>
          )}
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              if (resource.url) {
                window.open(resource.url, '_blank');
              }
            }}
          >
            <span className="capitalize">{resource.type === 'tool' ? 'Use Tool' : `View ${resource.type}`}</span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}