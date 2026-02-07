import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

export default function CommentsSection({ storyId, commentsCount }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const result = await base44.entities.StoryComment.filter({ story_id: storyId, status: 'approved' }, '-created_date');
        setComments(result);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadComments();
  }, [storyId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await base44.entities.StoryComment.create({
        story_id: storyId,
        author_name: 'Anonymous',
        content: newComment,
        status: 'pending'
      });
      setNewComment('');
      // Comment added to pending
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="px-6 py-4 bg-black/30 border-t border-white/10 space-y-4">
      
      {/* Comment Input */}
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          maxLength={300}
          className="text-white rounded-full bg-white/10 border-white/20"
        />
        <Button
          onClick={handleSubmitComment}
          disabled={isSubmitting || !newComment.trim()}
          size="icon"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full disabled:opacity-50">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      {/* Approved Comments */}
      {isLoading ? (
        <p className="text-xs text-gray-400">Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-3 mt-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {comment.author_name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-300">{comment.author_name}</p>
                  <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">No approved comments yet. Be the first!</p>
      )}
    </motion.div>
  );
}