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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-cyan-50 to-sky-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6">
              Share Your Story
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Choose which topic you'd like to share with the Story Wall. You can answer one, multiple, 
              or all three questionnaires. You don't have to answer every question in each survey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Survey Cards */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {surveys.map((survey, index) => {
            const Icon = survey.icon;
            return (
              <motion.a
                key={index}
                href={survey.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="block p-6 lg:p-8 rounded-2xl border-2 border-blue-200 bg-white hover:bg-blue-50 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg lg:text-xl font-semibold text-blue-900 mb-2">
                        {survey.title}
                      </h3>
                      <p className="text-slate-600 text-sm lg:text-base">
                        {survey.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Bottom Info */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50/50 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-slate-600 text-lg">
            Your story matters. Thank you for contributing to our community.
          </p>
        </motion.div>
      </section>
    </div>
  );
}