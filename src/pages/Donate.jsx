import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StripePaymentForm from '@/components/donate/StripePaymentForm';

const impacts = [
  { amount: '$5',  description: 'Provides mental health resources and materials for one student',            gradient: 'from-blue-500 to-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  { amount: '$10', description: 'Supports a community support session for 10–15 teens',                     gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50',   border: 'border-blue-200' },
  { amount: '$25', description: 'Funds a cultural awareness workshop at a local school',                     gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { amount: '$50', description: 'Sponsors a full month of community programming and outreach',               gradient: 'from-blue-500 to-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-200' },
];

const whyPoints = [
  {
    num: '1',
    title: 'Free & Accessible Programs',
    body: 'All our services are completely free for teens and families. Your donation ensures cost is never a barrier to getting help.',
  },
  {
    num: '2',
    title: 'Culturally Informed Care',
    body: 'We train peer mentors who understand the unique pressures Asian American teens face. This specialized support makes all the difference.',
  },
  {
    num: '3',
    title: 'Growing Our Reach',
    body: 'Funds help us expand to more schools across King County and serve more teens who need support.',
  },
];

const allocation = [
  { label: 'Direct Programs & Services',  pct: 65, desc: 'Community programs, workshops, and mental health resources' },
  { label: 'School Partnerships',          pct: 20, desc: 'Training educators and bringing programs to schools' },
  { label: 'Operations & Growth',          pct: 15, desc: 'Administrative costs and expanding our reach' },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="pt-20 pb-24 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-4">Make an Impact</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Support the next generation's <span className="text-blue-200">mental wellness</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Your donation helps us create safe spaces where Asian teens can be heard, understood,
              and supported. Every contribution directly impacts a young person's journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT LEVELS ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-blue-900 mb-3">Your <span className="text-blue-600">Impact</span></h2>
            <p className="text-blue-700 max-w-xl mx-auto">Every gift, no matter the size, creates real change in a teen's life</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.amount}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border border-blue-100 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
              >
                {/* Top accent */}
                <div className={`h-1 -mx-6 -mt-6 mb-6 rounded-t-2xl bg-gradient-to-r ${impact.gradient}`} />
                <div className="text-3xl font-black text-blue-700 mb-3">{impact.amount}</div>
                <p className="text-blue-600 text-sm leading-relaxed">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DONATE ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left: Why points */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Why Donate to <span className="text-blue-600">HopeBridge?</span>
              </h2>
              <div className="space-y-6">
                {whyPoints.map(({ num, title, body }) => (
                  <div key={num} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      {num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Allocation chart */}
            <div className="pt-8 border-t border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Where Your Money Goes</h3>
              <div className="space-y-5">
                {allocation.map(({ label, pct, desc }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-gray-900 text-sm">{label}</span>
                      <span className="font-black text-blue-600">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-blue-100">
                <p className="text-sm text-gray-600"><strong className="text-gray-900">100% transparent.</strong> Every dollar goes toward supporting teens.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DONATION FORM ── */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-3">Make Your Donation</h2>
            <p className="text-gray-600">Choose an amount and complete your secure donation in just a few clicks</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <StripePaymentForm />
          </motion.div>

          <p className="text-center text-sm text-gray-400 mt-6">
            HopeBridge is not yet a 501(c)(3) nonprofit. Donations are not tax-deductible at this time.
          </p>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-14 px-6 lg:px-8 bg-blue-600">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Questions About Donating?</h3>
          <p className="text-blue-200 mb-6">We're here to help. Reach out to learn more about how your contribution will be used.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:hopebridgecommunityservices@gmail.com" className="text-blue-100 hover:text-white font-medium hover:underline transition-colors text-sm">
              hopebridgecommunityservices@gmail.com
            </a>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="text-blue-200 text-sm">Sammamish, WA</span>
          </div>
        </div>
      </section>
    </div>
  );
}
