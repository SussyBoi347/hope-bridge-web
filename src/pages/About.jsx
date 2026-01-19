import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Lightbulb } from 'lucide-react';

export default function About() {
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
              About Hope Bridge
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              We exist because too many Asian teens face mental health struggles alone—caught between cultural expectations and their own wellbeing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg text-[#5C5854] leading-relaxed"
          >
            <p>
              Hope Bridge started from a simple observation: the Asian American teens in our Sammamish community were struggling, but existing mental health resources weren't reaching them—or weren't designed with their experiences in mind.
            </p>
            <p>
              We saw students carrying immense academic pressure, navigating complex cultural identities, and internalizing stress because talking about mental health felt taboo. Traditional counseling didn't always resonate. School resources were overwhelmed. Parents often didn't know how to help.
            </p>
            <p>
              So we built something different. Hope Bridge is peer-led, culturally informed, and rooted in community. We train teens to support other teens. We bring mental health conversations into schools. We create spaces where family expectations and personal wellbeing can coexist.
            </p>
            <p>
              We're not therapists. We're a bridge—connecting students to each other, to resources, and to the understanding that they don't have to carry everything alone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-6">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Heart,
                title: 'Born from Community Need',
                desc: 'Hope Bridge exists because Asian American teens in King County told us what they needed. We listen first, build second.'
              },
              {
                icon: Users,
                title: 'Culturally Grounded',
                desc: "We don't just acknowledge cultural context—we center it. Our programs are designed with Asian American family dynamics, identity struggles, and community pressures in mind."
              },
              {
                icon: Target,
                title: 'Peer-Led & Youth-Centered',
                desc: 'Teens know what teens need. Our programs are led by trained peer mentors who have walked similar paths and understand firsthand.'
              },
              {
                icon: Lightbulb,
                title: 'Accessible & Judgment-Free',
                desc: 'All our services are free. No barriers, no intake forms, no pressure. Just support when you need it, on your terms.'
              }
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30 flex gap-6"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-7 h-7 text-[#4A5568]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] mb-3">{value.title}</h3>
                  <p className="text-[#5C5854] leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-6 text-center">
              Our Vision for the Future
            </h2>
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#C4BFB8]/30">
              <p className="text-lg text-[#5C5854] leading-relaxed mb-6">
                We envision a world where every Asian American teen has access to culturally informed mental health support—where talking about struggles isn't shameful, where family and personal wellbeing aren't at odds, and where community is the foundation of healing.
              </p>
              <p className="text-lg text-[#5C5854] leading-relaxed">
                Hope Bridge is starting in King County, but our model is replicable. We want to see peer-led, culturally grounded mental health programs in schools across the country. We want to normalize these conversations in Asian American communities. And we want every teen to know: you don't have to carry this alone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-6 lg:px-8 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-[#2D3748] mb-4">
              Based in Sammamish, Serving King County
            </h3>
            <p className="text-[#5C5854] leading-relaxed">
              Hope Bridge is headquartered in Sammamish, Washington, and serves schools and communities throughout King County. We're growing—reach out if you'd like to bring Hope Bridge to your area.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}