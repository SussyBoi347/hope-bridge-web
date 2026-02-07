import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Lightbulb, Heart, ArrowRight } from 'lucide-react';

const surveys = [
  {
    icon: Heart,
    title: 'Disconnect Between Teens & Families',
    description: 'Share your experiences with family dynamics and healing relationships',
    link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=P9TUotEV1EmNhz59fcZDl7o0ms4blAxFsZimiVmxgC9URUZWT0lTTjJQS0M4UlgyNUU1TkVGQ0sxNy4u'
  },
  {
    icon: BookOpen,
    title: 'Academic Pressure & Success',
    description: 'Reflect on academic stress, peer and school pressures, and redefining success beyond grades',
    link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=P9TUotEV1EmNhz59fcZDl7o0ms4blAxFsZimiVmxgC9URFMxVllZUFczMUFTVUhSQzdKNFhWUUVGRC4u'
  },
  {
    icon: Lightbulb,
    title: 'Embracing Cultural Identity',
    description: 'Explore your cultural roots and identity journey',
    link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=P9TUotEV1EmNhz59fcZDl7o0ms4blAxFsZimiVmxgC9UNlRLUzlCSDZYMVozOFRNN1EzSktPWVlQWC4u'
  }
];

export default function StorySharing() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
        <div className="absolute top-40 right-[15%] w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[30%] w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8">
              <span className="text-6xl">✍️</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              Share Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Choose which topic you'd like to share with the Story Wall. You can answer one, multiple, 
              or all three questionnaires. You don't have to answer every question in each survey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Survey Cards */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {surveys.map((survey, index) => {
            const Icon = survey.icon;
            return (
              <motion.a
                key={index}
                href={survey.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="block p-8 lg:p-10 rounded-2xl backdrop-blur-md bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 group">
                
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-start gap-6 flex-1">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {survey.title}
                      </h3>
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                        {survey.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex-shrink-0">
                    <ArrowRight className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Bottom Info */}
      <section className="relative py-20 px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-black/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <p className="text-2xl text-white font-semibold mb-2">
            Your story matters 
          </p>
          <p className="text-gray-400 text-lg">
            Thank you for contributing to our community
          </p>
        </motion.div>
      </section>
    </div>
  );
}