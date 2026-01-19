import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Users, Megaphone, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const ways = [
  {
    icon: Heart,
    title: "Volunteer",
    description: "Become a peer mentor, workshop facilitator, or help with community events. Your time and passion can make a real difference.",
    cta: "Learn More",
    gradient: "from-[#5B4E77] to-[#7B9AB8]"
  },
  {
    icon: DollarSign,
    title: "Donate",
    description: "Your financial support keeps all our programs free and accessible for teens who need them most.",
    cta: "Make a Donation",
    link: "Donate",
    gradient: "from-[#7B9AB8] to-[#5B4E77]"
  },
  {
    icon: Megaphone,
    title: "Spread the Word",
    description: "Share our mission with families, schools, and communities who could benefit from our services.",
    cta: "Share Our Mission",
    gradient: "from-[#5B4E77] to-[#7B9AB8]"
  },
  {
    icon: Users,
    title: "Partner With Us",
    description: "Schools, organizations, and mental health professionals—let's collaborate to expand our reach and impact.",
    cta: "Explore Partnerships",
    gradient: "from-[#7B9AB8] to-[#5B4E77]"
  }
];

export default function GetInvolved() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Join us in creating{' '}
              <span className="bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] bg-clip-text text-transparent">
                lasting change
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Whether you have time, resources, or a platform to share, there are many ways 
              to support Asian teen mental health in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${way.gradient} flex items-center justify-center mb-6 shadow-sm`}>
                  <way.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {way.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {way.description}
                </p>
                <Link to={createPageUrl(way.link || 'Contact')}>
                  <Button 
                    variant="outline" 
                    className="border-[#5B4E77]/20 text-[#5B4E77] hover:bg-[#E8EEF3]/50 rounded-full"
                  >
                    {way.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white/50 to-[#E8EEF3]/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">
              Your Support Creates Real Change
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Every volunteer hour, every dollar donated, and every story shared helps us reach 
              more teens who are struggling in silence. Together, we're building a community where 
              mental health conversations are welcomed, not feared.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] hover:from-[#3F3351] hover:to-[#5B4E77] text-white rounded-full px-8 py-6 text-lg shadow-md">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}