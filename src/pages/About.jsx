import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Hope Bridge
              </span>
            </h1>
            <p className="mt-6 text-lg text-white leading-relaxed max-w-2xl mx-auto">
              We're building the <span className="font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">mental health support system</span> we wish existed—one that truly 
              understands the Asian American teen experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-cyan-400/40 shadow-[0_0_40px_rgba(0,217,255,0.15)]">

            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">Our Story</h2>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                Hope Bridge was born from a simple observation: too many Asian American teens are 
                suffering in silence, caught between cultural expectations and personal struggles 
                with no one to turn to.
              </p>
              <p>
                We saw young people excelling academically while quietly drowning emotionally. We 
                watched families struggle to talk about mental health in communities where it's still 
                stigmatized. We recognized that existing support systems, while well-meaning, often 
                miss the cultural nuances that make all the difference.
              </p>
              <p className="">So we created Hope Bridge a space where Asian American teens can find support that actually gets it. Where they can talk about the pressure to be perfect, the struggle of navigating two cultures, and the loneliness of feeling like no one understands.



              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.2)]">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                <Target className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(0,217,255,0.8)]" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">Our Mission</h3>
              <p className="text-white leading-relaxed">
                To provide culturally informed mental health support for Asian American teens, 
                creating safe spaces where they can be heard, understood, and empowered.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.2)]">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                <Eye className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(0,217,255,0.8)]" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">Our Vision</h3>
              <p className="text-white leading-relaxed">
                A community where Asian American teens thrive emotionally, where mental health 
                conversations are normalized, and where cultural identity is celebrated, not silenced.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.2)]">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                <Heart className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(0,217,255,0.8)]" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">Our Values</h3>
              <p className="text-white leading-relaxed">
                Cultural sensitivity, peer support, accessibility, breaking stigma, and empowering 
                the next generation to prioritize their mental wellness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <Users className="w-12 h-12 text-cyan-300 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">
              Our Team
            </h2>
            <p className="text-white text-lg leading-relaxed">Hope Bridge is an up-and-coming organization founded by six Asian teens, Samvid, Ishaan, Rishi, Arjun, Anish, and Arnav. We aim to address the common struggles many Asian teens face in embracing cultural identity, navigating academics pressures, and healing family disconnect.




            </p>
          </motion.div>
        </div>
      </section>
    </div>);

}