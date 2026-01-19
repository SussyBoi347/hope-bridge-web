import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Users, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const pathways = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Become a peer mentor, lead discussions, or help shape our programs. Your voice matters.',
    steps: [
      'Complete peer mentor training (15 hours)',
      'Co-facilitate support circles',
      'Share your story (optional)',
      'Help plan events and workshops'
    ]
  },
  {
    icon: Users,
    title: 'Volunteers',
    description: 'Support our work behind the scenes—from event planning to graphic design to social media.',
    steps: [
      'Fill out volunteer interest form',
      'Attend orientation session',
      'Choose your area of contribution',
      'Commit to at least 3 months'
    ]
  },
  {
    icon: Briefcase,
    title: 'Community Members',
    description: 'Advocate for mental health awareness, spread the word, or contribute your professional skills.',
    steps: [
      'Join our mailing list for updates',
      'Share Hope Bridge with your networks',
      'Attend community events',
      'Offer pro bono professional support'
    ]
  },
  {
    icon: Heart,
    title: 'Donors & Supporters',
    description: 'Fund our programs, sponsor events, or provide in-kind donations to keep our services free.',
    steps: [
      'Make a one-time or recurring donation',
      'Sponsor a specific program or event',
      'Provide in-kind donations (space, materials)',
      'Connect us with funding opportunities'
    ]
  }
];

export default function GetInvolved() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-[#F5F2ED] to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#2D3748] leading-tight mb-6">
              Be Part of the Change
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              Hope Bridge exists because people like you believe mental health support should be accessible, culturally aware, and community-driven. Here's how you can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {pathways.map((pathway, idx) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F5F2ED] flex items-center justify-center mb-6">
                  <pathway.icon className="w-7 h-7 text-[#4A5568]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#2D3748] mb-3">{pathway.title}</h3>
                <p className="text-[#5C5854] leading-relaxed mb-6">{pathway.description}</p>
                <div className="space-y-2 mb-6">
                  {pathway.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-[#8B8680] text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8FA58C] mt-2 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Get Involved */}
      <section className="py-20 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-6">
              Why Your Involvement Matters
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'You Have Lived Experience',
                desc: 'If you've navigated similar struggles, your perspective is invaluable to other teens.'
              },
              {
                title: 'You Expand Our Reach',
                desc: 'Every person who shares our mission helps us reach more students who need support.'
              },
              {
                title: 'You Build Community',
                desc: 'This work is about connection. You're not just volunteering—you're creating spaces of belonging.'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#C4BFB8]/30 text-center"
              >
                <h3 className="font-semibold text-[#2D3748] mb-3">{item.title}</h3>
                <p className="text-[#5C5854] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 text-[#4A5568] mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">
              Ready to Get Involved?
            </h2>
            <p className="text-[#5C5854] text-lg mb-8 leading-relaxed">
              Let us know how you'd like to contribute. We'll connect you with the right opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] px-8 py-6 text-lg rounded-xl">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Donate')}>
                <Button variant="outline" className="border-2 border-[#4A5568] text-[#4A5568] hover:bg-[#F5F2ED] px-8 py-6 text-lg rounded-xl">
                  Support Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}