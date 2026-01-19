import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users, ClipboardList, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Hope Bridge
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We're building the mental health support system we wish existed—one that truly 
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
            className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100"
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
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
              <p>
                So we created Hope Bridge—a space where Asian American teens can find support that 
                actually gets it. Where they can talk about the pressure to be perfect, the struggle 
                of navigating two cultures, and the loneliness of feeling like no one understands.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide culturally informed mental health support for Asian American teens, 
                creating safe spaces where they can be heard, understood, and empowered.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                A community where Asian American teens thrive emotionally, where mental health 
                conversations are normalized, and where cultural identity is celebrated, not silenced.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Values</h3>
              <p className="text-slate-600 leading-relaxed">
                Cultural sensitivity, peer support, accessibility, breaking stigma, and empowering 
                the next generation to prioritize their mental wellness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Survey Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-500 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <ClipboardList className="w-16 h-16 mx-auto mb-6 text-cyan-100" />
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Share Your Voice
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your experiences and insights help us better serve our community. Take our brief community 
              survey to help shape the future of mental health support for Asian American teens.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-cyan-200" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-xs text-blue-100">Responses collected</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Users className="w-6 h-6 mx-auto mb-2 text-cyan-200" />
                <div className="text-2xl font-bold">5 min</div>
                <div className="text-xs text-blue-100">Average time to complete</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Heart className="w-6 h-6 mx-auto mb-2 text-cyan-200" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-blue-100">Anonymous & confidential</div>
              </div>
            </div>

            <a 
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=P2fUH5bfIUaGOKHYjEyF1z0k6dCGAoZDs6jElXg1mJlUM0YxQVlLUUlNUURZUlQ0VjlJV0NSNldCTi4u"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              Take the Community Survey
            </a>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">
              Our Team
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Hope Bridge is led by a diverse team of mental health professionals, educators, and 
              community advocates—many of whom are Asian American themselves and understand these 
              challenges firsthand. We're supported by trained peer mentors, dedicated volunteers, 
              and partner organizations across King County.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}