import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import HopeBridgeChatWidget from '@/components/HopeBridgeChatWidget';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'Mission', page: 'Mission' },
    { label: 'Story Project', page: 'StoryProject' },
    { label: 'Get Support', page: 'GetSupport' },
    { label: 'Schools', page: 'Schools' },
    { label: 'Get Involved', page: 'GetInvolved' },
    { label: 'About', page: 'About' },
    { label: 'Contact', page: 'Contact' }
  ];

  return (
    <div className="min-h-screen">
      <style>{`
        :root {
          --color-primary: #2563EB;
          --color-primary-dark: #1E40AF;
          --color-accent: #0EA5E9;
          --color-sand: #F7F5F0;
          --color-warm-blue: #E0F2FE;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--color-sand);
        }

        ::selection {
          background-color: rgba(37, 99, 235, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to={createPageUrl('Home')} 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-0.5"
            >
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png" alt="Hope Bridge" className="w-16 h-16 object-contain" />
              <span className="text-xl font-semibold text-slate-900">Hope Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    currentPageName === link.page
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-slate-700 hover:from-blue-200 hover:to-cyan-200'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={createPageUrl('Donate')}>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full px-6 shadow-md shadow-blue-900/15"
                >
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                      currentPageName === link.page
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                        : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-slate-700 hover:from-blue-200 hover:to-cyan-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to={createPageUrl('Donate')} className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Chat Widget */}
      <HopeBridgeChatWidget />
      </div>
      );
      }