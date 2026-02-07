import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Lightbulb, Heart, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

const topics = [
  {
    value: 'family_pressures',
    label: 'Disconnect Between Teens & Families',
    icon: Heart,
    description: 'Share your experiences with family dynamics and healing relationships'
  },
  {
    value: 'academic_stress',
    label: 'Academic Pressure & Success',
    icon: BookOpen,
    description: 'Reflect on academic stress, peer and school pressures, and redefining success beyond grades'
  },
  {
    value: 'cultural_identity',
    label: 'Embracing Cultural Identity',
    icon: Lightbulb,
    description: 'Explore your cultural roots and identity journey'
  }
];

export default function StorySubmitForm() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    content: '',
    topic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setFormData({ ...formData, topic: topic.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.author_name.trim() || !formData.content.trim() || !formData.topic) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.content.length < 50) {
      setError('Story must be at least 50 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await base44.functions.invoke('submitStory', {
        title: formData.title,
        author_name: formData.author_name,
        content: formData.content,
        topic: formData.topic
      });
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit story. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">Thank you for sharing!</h2>
          <p className="text-white mb-8">
            Your story has been submitted for review. It will appear on the Story Wall once approved.
          </p>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ title: '', author_name: '', content: '', topic: '' });
              setSelectedTopic(null);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black rounded-full"
          >
            Submit Another Story
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-6xl">✍️</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight mt-4">
              Share Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Choose a topic that resonates with you and share your experience with our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topic Selection & Form */}
      <section className="relative py-24 px-6 lg:px-8 max-w-4xl mx-auto">
        {!selectedTopic ? (
          // Topic Selection
          <div className="space-y-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.button
                  key={topic.value}
                  onClick={() => handleTopicSelect(topic)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="w-full text-left p-8 lg:p-10 rounded-2xl backdrop-blur-md bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 group"
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {topic.label}
                      </h3>
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">{topic.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          // Story Form
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedTopic(null)}
              className="text-cyan-400 hover:text-cyan-300 text-sm mb-6 transition-colors"
            >
              ← Back to topics
            </button>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              <h2 className="text-2xl font-bold text-black mb-6">{selectedTopic.label}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Your Name *</label>
                  <Input
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="Enter your name"
                    className="rounded-xl border-gray-200 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Story Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Give your story a title"
                    className="rounded-xl border-gray-200 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Your Story *</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your experience... (minimum 50 characters)"
                    rows={8}
                    className="rounded-xl border-gray-200 resize-none text-black"
                  />
                  <p className="text-xs text-gray-500 mt-2">{formData.content.length} characters</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedTopic(null)}
                    className="rounded-full flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || formData.content.length < 50}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white rounded-full flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Story'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </section>

      {/* Bottom Info */}
      {!selectedTopic && (
        <section className="relative py-20 px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-black/50">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-2xl text-white font-semibold mb-2">Your story matters</p>
            <p className="text-gray-400 text-lg">Thank you for contributing to our community</p>
          </motion.div>
        </section>
      )}
    </div>
  );
}