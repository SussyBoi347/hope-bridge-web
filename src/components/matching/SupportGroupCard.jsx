import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Star, Calendar, MapPin, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportGroupCard({ group }) {
  const isFull = group.max_members && group.current_members >= group.max_members;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-purple-500/30 hover:border-purple-400/60 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{group.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{group.current_members} {group.max_members ? `/ ${group.max_members}` : ''} members</span>
              </div>
            </div>
            {group.match_score && (
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full">
                <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">
                  {Math.round(group.match_score * 100)}%
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{group.description}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          {group.match_reason && (
            <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-200">
                <strong className="text-purple-400">Why this match:</strong> {group.match_reason}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-2">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {group.focus_areas.map((area, i) => (
                  <Badge key={i} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{group.meeting_schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="capitalize">{group.meeting_format}</span>
              </div>
            </div>

            {group.age_range && (
              <div className="text-sm text-gray-400">
                <strong className="text-gray-300">Age Range:</strong> {group.age_range}
              </div>
            )}

            {group.facilitator && (
              <div className="text-sm text-gray-400">
                <strong className="text-gray-300">Facilitator:</strong> {group.facilitator}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40"
            disabled={isFull}
          >
            {isFull ? (
              'Group Full'
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Join Group
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}