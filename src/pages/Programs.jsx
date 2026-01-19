import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen, MessageCircle, Building, Heart } from 'lucide-react';

const programs = [
  {
    icon: Users,
    title: 'Peer Support Circles',
    description: 'Small group sessions (8-12 students) facilitated by trained peer mentors who understand the Asian American teen experience. A space to share, listen, and feel less alone.',
    details: [
      'Weekly or bi-weekly meetings',
      'Led by culturally aware peer mentors',
      'Safe, confidential environment',
      'Topics driven by group needs'
    ]
  },
  {
    icon: Calendar,
    title: 'Workshops & Discussions',
    description: 'Interactive sessions on topics like managing academic stress, navigating cultural identity, having difficult conversations with parents, and building emotional resilience.',
    details: [
      'Monthly themed workshops',
      'Guest speakers and facilitators',
      'Practical tools and strategies',
      'Open dialogue and Q&A'
    ]
  },
  {
    icon: Building,
    title: 'School Partnerships',
    description: 'We bring mental health awareness and support directly to schools through assemblies, counselor training, student-led initiatives, and ongoing consultation.',
    details: [
      'School-wide awareness programs',
      'Professional development for staff',
      'Student leadership opportunities',
      'Ongoing support and resources'
    ]
  },
  {
    icon: BookOpen,
    title: 'Resource Hub',
    description: 'Curated resources for teens, parents, and educators—including guides on having mental health conversations across cultural contexts, crisis hotlines, and local support services.',
    details: [
      'Culturally relevant materials',
      'Crisis resources and hotlines',
      'Parent conversation guides',
      'Community referrals'
    ]
  },
  {
    icon: MessageCircle,
    title: 'One-on-One Mentorship',
    description: 'Individual connections with trained peer mentors for more personalized support. Completely confidential and tailored to your needs.',
    details: [
      'Flexible meeting times',
      'Matched based on needs and interests',
      'Judgment-free conversations',
      'Help navigating resources'
    ]
  },
  {
    icon: Heart,
    title: 'Community Events',
    description: 'Social gatherings, cultural celebrations, and wellness activities that build community and normalize mental health conversations in relaxed, fun settings.',
    details: [
      'Quarterly community gatherings',
      'Cultural celebrations',
      'Wellness activities (art, movement, etc.)',
      'Peer connection opportunities'
    ]
  }
];

export default function Programs() {
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
              Programs Built With You in Mind
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              Every program is designed with cultural context and real teen experiences at the center—because support that doesn't understand your world can't truly help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F5F2ED] flex items-center justify-center mb-6">
                  <program.icon className="w-7 h-7 text-[#4A5568]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#2D3748] mb-4">{program.title}</h3>
                <p className="text-[#5C5854] leading-relaxed mb-6">{program.description}</p>
                <ul className="space-y-2">
                  {program.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#8B8680]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8FA58C] mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Free Notice */}
      <section className="py-16 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-10 shadow-sm border border-[#C4BFB8]/30"
          >
            <Heart className="w-12 h-12 text-[#8FA58C] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">
              All Programs Are Free
            </h2>
            <p className="text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              We believe mental health support should be accessible to everyone. All Hope Bridge programs and resources are completely free for teens, families, and schools.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}