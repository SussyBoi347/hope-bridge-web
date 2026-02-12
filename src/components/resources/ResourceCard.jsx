import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Wrench, Clock, Star, ExternalLink, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const typeIcons = {
  article: BookOpen,
  guide: FileText,
  tool: Wrench,
  video: Video,
  worksheet: FileText
};

const typeColors = {
  article: 'from-blue-500 to-cyan-500',
  guide: 'from-purple-500 to-pink-500',
  tool: 'from-green-500 to-emerald-500',
  video: 'from-red-500 to-orange-500',
  worksheet: 'from-yellow-500 to-amber-500'
};

export default function ResourceCard({ resource, showMatchInfo = false }) {
  const Icon = typeIcons[resource.type] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] h-full flex flex-col group">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeColors[resource.type]} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            {resource.relevance_score && (
              <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 rounded-full">
                <Star className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold">
                  {Math.round(resource.relevance_score)}%
                </span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {resource.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{resource.description}</p>
        </CardHeader>

        <CardContent className="flex-grow space-y-3">
          {showMatchInfo && (resource.match_reason || resource.recommendation_reason) && (
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-xs text-cyan-200">
                <strong className="text-cyan-400">Why this matches:</strong>{' '}
                {resource.match_reason || resource.recommendation_reason}
              </p>
            </div>
          )}

          {resource.addresses_challenges && resource.addresses_challenges.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-2">Addresses:</p>
              <div className="flex flex-wrap gap-1">
                {resource.addresses_challenges.map((challenge, i) => (
                  <Badge key={i} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-400 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {resource.categories.map((cat, i) => (
                <Badge key={i} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            {resource.reading_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{resource.reading_time} min</span>
              </div>
            )}
            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs capitalize">
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

        <CardFooter>
          <Button 
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 group-hover:border-cyan-400/60"
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