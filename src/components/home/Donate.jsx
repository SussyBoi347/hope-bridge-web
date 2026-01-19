import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Users, BookOpen, Shield } from 'lucide-react';

const impacts = [
  {
    icon: Users,
    amount: "$25",
    description: "Supports one teen's participation in a peer support circle"
  },
  {
    icon: BookOpen,
    amount: "$100",
    description: "Funds workshop materials for an entire school session"
  },
  {
    icon: Shield,
    amount: "$500",
    description: "Enables a full school partnership program for one semester"
  }
];

export default function Donate() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="donate" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-cyan-50/40 rounded-2xl p-8 lg:p-10 border border-blue-100/40 shadow-lg shadow-blue-100/30">
              <h3 className="text-xl font-semibold text-slate-900 mb-8">
                Your impact at every level
              </h3>

              <div className="space-y-6">
                {impacts.map((impact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-5 p-4 bg-white rounded-xl border border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <impact.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{impact.amount}</span>
                      <p className="text-slate-600 text-sm mt-1">{impact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-xl shadow-lg shadow-blue-500/30"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Make a Donation
                </Button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  Hope Bridge is a 501(c)(3) nonprofit. All donations are tax-deductible.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              Support Our Mission
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
              Help us reach more teens who need support
            </h2>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Every dollar you give goes directly toward programs that support Asian teens. 
              We keep our overhead low because we know that every resource matters.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">100% Program-Focused</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    All programs remain free for teens and families
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Full Transparency</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    We share exactly how your donation creates impact
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Community Investment</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Your support strengthens the entire ecosystem of care
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}