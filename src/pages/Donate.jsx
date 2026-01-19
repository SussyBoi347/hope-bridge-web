import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, Users, Sparkles, GraduationCap, MessageCircle, Building, ArrowRight } from 'lucide-react';
import StripePaymentForm from '@/components/donate/StripePaymentForm';

const impacts = [
  {
    icon: Heart,
    amount: "$25",
    description: "Provides mental health resources and materials for one student"
  },
  {
    icon: Users,
    amount: "$100",
    description: "Supports a peer support group session for 10-15 teens"
  },
  {
    icon: GraduationCap,
    amount: "$250",
    description: "Funds a cultural awareness workshop at a local school"
  },
  {
    icon: Building,
    amount: "$500",
    description: "Sponsors a month of community programming and outreach"
  }
];

export default function DonatePage() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-indigo-50/20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Make a Difference
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Support the next generation's{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                mental wellness
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Your donation helps us create safe spaces where Asian teens can be heard, 
              understood, and supported. Every contribution directly impacts a young person's journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Levels */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Your Impact
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every gift, no matter the size, creates real change in a teen's life
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.amount}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl bg-white border border-blue-100/50 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100/50 flex items-center justify-center mb-4 group-hover:from-blue-100 group-hover:to-sky-100 transition-all">
                    <impact.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                    {impact.amount}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-sky-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-8">
              Why Your Support Matters
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Free & Accessible Programs</h3>
                  <p className="text-slate-600 leading-relaxed">
                    All our services are completely free for teens and families. Your donation ensures 
                    that cost is never a barrier to getting help.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Culturally Informed Care</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We train peer mentors and facilitators who understand the unique pressures 
                    Asian American teens face. This specialized support makes all the difference.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Growing Our Reach</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Funds help us expand to more schools across King County and serve more teens 
                    who need support navigating mental health challenges.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heart className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Make Your Donation
            </h2>
            <p className="text-slate-600 text-lg">
              Choose an amount and complete your secure donation in just a few clicks
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
          >
            <StripePaymentForm />
          </motion.div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Hope Bridge is a 501(c)(3) nonprofit organization. All donations are tax-deductible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 lg:px-8 bg-gradient-to-b from-sky-50/30 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Questions About Donating?
          </h3>
          <p className="text-slate-600 mb-6">
            We're here to help. Reach out to learn more about how your contribution 
            will be used or to discuss partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:hopebridgecommunityservices@gmail.com" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              hopebridgecommunityservices@gmail.com
            </a>
            <span className="hidden sm:block text-slate-300">•</span>
            <span className="text-slate-600">Sammamish, WA</span>
          </div>
        </div>
      </section>
    </div>
  );
}