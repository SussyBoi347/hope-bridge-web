import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "For the first time, I didn't have to explain why getting a B felt like the end of the world. Everyone just got it.",
    author: "High School Junior",
    location: "Issaquah, WA"
  },
  {
    quote: "Hope Bridge helped me understand what my daughter was going through. Now we actually talk instead of argue.",
    author: "Parent",
    location: "Bellevue, WA"
  }
];

const goals = [
  { target: "500+", label: "Teens supported by 2025" },
  { target: "25", label: "School partnerships" },
  { target: "100%", label: "Free programs" }
];

export default function Impact() {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-cyan-300 font-medium text-sm tracking-wide uppercase">
            Our Impact
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
           <span className="font-bold bg-gradient-to-r from-cyan-300 to-cyan-200 bg-clip-text text-transparent">Real stories</span>, real change
          </h2>
          <p className="mt-6 text-lg text-blue-100">
            We measure our success not in numbers alone, but in the moments when 
            a teen feels understood for the first time.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-lg shadow-black/20 border border-white/30">
                <Quote className="w-10 h-10 text-blue-500/30 mb-6" />
                <blockquote className="text-xl text-slate-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 shadow-md shadow-blue-300/50" />
                  <div>
                    <p className="font-medium text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-10 lg:p-14 shadow-2xl shadow-blue-300/30">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Where we're headed
              </h3>
              <p className="text-white/80">
                Our commitment to the community
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {goal.target}
                  </div>
                  <p className="text-white/80 text-sm">
                    {goal.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}