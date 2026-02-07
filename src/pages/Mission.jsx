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
    'Celebrating the strength in multicultural experiences']

  },
  {
    icon: BookOpen,
    title: 'Navigating Academic Pressures',
    description: 'Addressing the intense academic expectations many Asian teens face while maintaining mental wellness. Success doesn\'t have to come at the cost of happiness.',
    details: [
    'Healthy approaches to academic achievement',
    'Redefining success beyond test scores and grades',
    'Managing family expectations around education',
    'Building resilience without burning out']

  },
  {
    icon: HomeIcon,
    title: 'Healing Family Disconnect',
    description: 'Bridging generational and cultural gaps between Asian teens and their families. We help families communicate across differences in language, values, and mental health understanding.',
    details: [
    'Parent education on teen mental health',
    'Facilitating conversations across generations',
    'Honoring family values while expressing needs',
    'Resources in multiple languages for families']

  }];


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
  }];


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/60 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/60 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/50 rounded-full blur-2xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-sm font-medium mb-6 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
              <Target className="w-4 h-4" />
              Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-8">
              Supporting Asian teen{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                mental health
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {[
            { number: "1 in 3", label: "Asian teens struggle with mental health" },
            { number: "50%", label: "Less likely to seek help than peers" }].
            map((stat, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 text-center border border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.2)]">

                <div className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">{stat.number}</div>
                <div className="text-xs sm:text-sm text-white mt-1">{stat.label}</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-16" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,64 C320,100 640,20 960,64 C1280,100 1440,40 1440,40 L1440,120 L0,120 Z" fill="#000000" />
          </svg>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-cyan-400/40 shadow-[0_0_40px_rgba(0,217,255,0.15)]">

            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Mission Statement
            </h2>
            <p className="text-lg text-white leading-relaxed text-center mb-8">
              Hope Bridge exists to create a world where every Asian American teen feels empowered to 
              prioritize their mental health without shame, stigma, or silence.
            </p>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                We recognize that Asian American teens face unique challenges at the intersection of cultural 
                expectations, academic pressures, and identity formation. Too often, these struggles are faced 
                in isolation, with limited culturally-informed support available.
              </p>
              <p className="">Through peer-led support groups, culturally aware programming, and community education, we're building bridges between teens and resources, between generations in families, and between traditional values and modern mental health understanding.



              </p>
              <p className="font-medium text-white">
                We believe that mental wellness is not a luxury, but a fundamental right. By centering the voices 
                and experiences of Asian American youth, we're creating lasting change in how our communities 
                approach mental health.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Core Goals */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">

            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Three Interconnected Goals
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Our work focuses on these essential pillars of Asian teen mental wellness
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreGoals.map((goal, index) =>
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.3)] hover:border-cyan-400/60 transition-all">

                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                  <goal.icon className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_6px_rgba(0,217,255,0.8)]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {goal.title}
                </h3>
                <p className="text-white leading-relaxed mb-4">
                  {goal.description}
                </p>

              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-black to-slate-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Why This Work Matters
            </h2>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.2)]">
                <div className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">2.5x</div>
                <div className="text-sm text-white mt-1">Higher depression rates</div>
              </div>
              <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.2)]">
                <div className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">30%</div>
                <div className="text-sm text-white mt-1">Considered suicide</div>
              </div>
              <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.2)]">
                <div className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">8%</div>
                <div className="text-sm text-white mt-1">Seek professional help</div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>);

}