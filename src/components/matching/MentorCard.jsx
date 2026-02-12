import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Star, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentorCard({ mentor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/30 hover:border-cyan-400/60 transition-all hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                <p className="text-sm text-gray-400">Age {mentor.age}</p>
              </div>
            </div>
            {mentor.match_score && (
              <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 rounded-full">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span className="text-cyan-400 text-sm font-semibold">
                  {Math.round(mentor.match_score * 100)}%
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{mentor.bio}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          {mentor.match_reason && (
            <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-200">
                <strong className="text-cyan-400">Why this match:</strong> {mentor.match_reason}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-2">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((exp, i) => (
                  <Badge key={i} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>

            {mentor.interests && mentor.interests.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.interests.map((interest, i) => (
                    <Badge key={i} variant="outline" className="border-gray-600 text-gray-300">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {mentor.availability && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{mentor.availability}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40">
            <MessageCircle className="w-4 h-4 mr-2" />
            Connect with {mentor.name}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}