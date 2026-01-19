import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Sparkles, Target, Compass, Home as HomeIcon } from 'lucide-react';

export default function Mission() {
  const coreGoals = [
    {
      icon: Compass,
      title: 'Embracing Cultural Identity',
      description: 'Helping Asian teens navigate the beautiful complexity of their bicultural identity. We create spaces where being Asian American isn\'t about choosing one culture over another, but celebrating both.',
      details: [
        'Peer-led discussions exploring identity and belonging',
        'Cultural heritage appreciation alongside modern values',
        'Support for teens feeling caught between two worlds',
        'Celebrating the strength in multicultural experiences'
      ]
    },
    {
      icon: BookOpen,
      title: 'Navigating Academic Pressures',
      description: 'Addressing the intense academic expectations many Asian teens face while maintaining mental wellness. Success doesn\'t have to come at the cost of happiness.',
      details: [
        'Healthy approaches to academic achievement',
        'Redefining success beyond test scores and grades',
        'Managing family expectations around education',
        'Building resilience without burning out'
      ]
    },
    {
      icon: HomeIcon,
      title: 'Healing Family Disconnect',
      description: 'Bridging generational and cultural gaps between Asian teens and their families. We help families communicate across differences in language, values, and mental health understanding.',
      details: [
        'Parent education on teen mental health',
        'Facilitating conversations across generations',
        'Honoring family values while expressing needs',
        'Resources in multiple languages for families'
      ]
    }
  ];

  const howWeWork = [
    {
      icon: Heart,
      title: 'Safe Spaces',
      description: 'We create judgment-free environments where Asian teens can share their experiences openly, without fear of shame or misunderstanding. Every voice matters, every feeling is valid.'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connection is healing. We bring together teens who share similar cultural backgrounds and challenges, fostering a community where "me too" becomes a powerful source of strength.'
    },
    {
      icon: Sparkles,
      title: 'Breaking Stigma',
      description: 'Through education, storytelling, and awareness campaigns, we normalize mental health conversations in Asian communities. Seeking help is a sign of courage, not weakness.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-blue-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-8">
              Supporting Asian teen{' '}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                mental health
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-blue-100"
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">
              Our Mission Statement
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed text-center mb-8">
              Hope Bridge exists to create a world where every Asian American teen feels empowered to 
              prioritize their mental health without shame, stigma, or silence.
            </p>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                We recognize that Asian American teens face unique challenges at the intersection of cultural 
                expectations, academic pressures, and identity formation. Too often, these struggles are faced 
                in isolation, with limited culturally-informed support available.
              </p>
              <p>
                Through peer-led support groups, culturally aware programming, and community education, we're 
                building bridges—between teens and resources, between generations in families, and between 
                traditional values and modern mental health understanding.
              </p>
              <p className="font-medium text-slate-900">
                We believe that mental wellness is not a luxury, but a fundamental right. By centering the voices 
                and experiences of Asian American youth, we're creating lasting change in how our communities 
                approach mental health.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Core Goals */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Three Interconnected Goals
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our work focuses on these essential pillars of Asian teen mental wellness
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 flex items-center justify-center mb-6">
                  <goal.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {goal.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {goal.description}
                </p>
                <ul className="space-y-3">
                  {goal.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              How We Make It Happen
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our approach combines community, culture, and compassion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howWeWork.map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center mb-4">
                  <approach.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {approach.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-slate-800 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Why This Work Matters
            </h2>
            <div className="space-y-6 text-lg text-blue-100 leading-relaxed">
              <p>
                Asian American teens are experiencing a mental health crisis, yet they're the least likely 
                demographic to seek help. Cultural stigma, language barriers, and a lack of culturally-informed 
                resources create impossible barriers.
              </p>
              <p>
                Hope Bridge exists because we believe no teen should suffer in silence. We're not just providing 
                services—we're changing the narrative around mental health in Asian communities, one conversation, 
                one peer group, one family at a time.
              </p>
              <p className="font-medium text-white text-xl">
                Together, we're building a future where asking for help is seen as strength, 
                where cultural identity is celebrated, and where every teen knows they deserve support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}