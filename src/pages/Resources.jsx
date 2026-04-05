import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const crisisResources = [
  { name: "988 Suicide & Crisis Lifeline", description: "Call or text 988 anytime, free, confidential, available 24/7.", action: "Call or Text 988", href: "tel:988", tag: "24/7" },
  { name: "Crisis Text Line", description: "Text HOME to 741741 for free crisis support via text message.", action: "Text HOME to 741741", href: "sms:741741&body=HOME", tag: "Text" },
  { name: "Trevor Project (LGBTQ+)", description: "Crisis support for LGBTQ+ youth. Call 1-866-488-7386 or text START to 678-678.", action: "Call 1-866-488-7386", href: "tel:18664887386", tag: "LGBTQ+" },
  { name: "SAMHSA Helpline", description: "Free, confidential mental health and substance use referrals. Call 1-800-662-4357.", action: "Call 1-800-662-4357", href: "tel:18006624357", tag: "Referrals" }
];

const aapiResources = [
  { name: "Asian Mental Health Collective", description: "A community that normalizes and de-stigmatizes mental health in the Asian community. Therapist directory, resources, and community.", url: "https://www.asianmhc.org", tag: "Community" },
  { name: "Asian Counseling & Referral Service", description: "Mental health and social services for Asian Americans across the Pacific Northwest, including King County.", url: "https://acrs.org", tag: "King County" },
  { name: "NAAPIMHA", description: "National organization advancing mental health equity and wellness for Native Hawaiian, Asian American, and Pacific Islander communities.", url: "https://www.naapimha.org", tag: "National" },
  { name: "Asian Pacific Islander Americans for Civic Empowerment", description: "Community advocacy and wellness resources for AAPI communities throughout Washington State.", url: "https://www.apiahf.org", tag: "Washington" }
];

const onlineResources = [
  { name: "7 Cups", description: "Free online chat with trained listeners. Available 24/7 for teens and adults needing someone to talk to.", url: "https://www.7cups.com", tag: "Chat Support" },
  { name: "Headspace", description: "Guided meditation and mindfulness for stress, sleep, and focus. Free for teens.", url: "https://www.headspace.com", tag: "Wellness" },
  { name: "Teen Line", description: "A helpline run by teens for teens. Call, text, or chat with a peer who gets it. Available nightly.", url: "https://www.teenline.org", tag: "Peer Support" },
  { name: "ReachOut", description: "Mental health information, tools, and stories for young people, practical guides on anxiety, stress, and identity.", url: "https://au.reachout.com", tag: "Information" },
  { name: "NAMI Teen & Young Adult Hub", description: "Resources, stories, and mental health info tailored specifically for teens and young adults from NAMI.", url: "https://www.nami.org/Your-Journey/Kids-Teens-and-Young-Adults/Teens", tag: "Education" },
  { name: "MHA Mental Health Screening", description: "Free, anonymous mental health screenings for depression, anxiety, PTSD, and more.", url: "https://screening.mhanational.org", tag: "Screening" }
];

const tabs = ["Crisis Help", "AAPI Resources", "Online Resources"];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("Crisis Help");

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="pt-20 pb-20 px-6 lg:px-8 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-4">Support Resources</p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
              Support is <span className="text-blue-200">always here</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Whether you need immediate help or long-term support, these resources are here for you.
              many specifically for Asian American teens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 lg:px-8 sticky top-16 z-30 bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-1 py-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto">

          {/* Crisis Help */}
          {activeTab === "Crisis Help" && (
            <motion.div key="crisis" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-3 mb-8 p-4 bg-blue-100 rounded-lg border border-blue-300">
                <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0" />
                <p className="text-sm text-blue-800 font-medium">
                  If you are in immediate danger, call 911. These resources are here when you need to talk.
                </p>
              </div>
              <div className="divide-y divide-blue-200">
                {crisisResources.map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="py-6 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-gray-900">{r.name}</h3>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">{r.tag}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{r.description}</p>
                    <a href={r.href} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800">
                      {r.action}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AAPI Resources */}
          {activeTab === "AAPI Resources" && (
            <motion.div key="aapi" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-gray-700 mb-8 text-lg">
                Organizations and resources created specifically for the Asian American and Pacific Islander community.
              </p>
              <div className="divide-y divide-blue-200">
                {aapiResources.map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="py-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-gray-900 leading-snug">{r.name}</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">{r.tag}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{r.description}</p>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800">
                      Visit Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Online Resources */}
          {activeTab === "Online Resources" && (
            <motion.div key="online" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-gray-700 mb-8 text-lg">
                Free online tools, apps, and platforms for mental health support, available whenever you need them.
              </p>
              <div className="divide-y divide-blue-200">
                {onlineResources.map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="py-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-gray-900 leading-snug">{r.name}</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">{r.tag}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{r.description}</p>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800">
                      Visit Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-white mb-4">
              Want support from HopeBridge directly?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Our programs are free, culturally informed, and designed specifically for Asian American teens.
              You do not have to navigate this alone.
            </p>
            <Link to={createPageUrl('GetSupport')}>
              <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg text-base shadow-lg transition-all duration-300">
                Get Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
