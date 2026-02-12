import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';


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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageName]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'About', page: 'About' },
    { label: 'Mission', page: 'Mission' },
    { label: 'Story Project', page: 'StoryProject' },
    { label: 'Find Support', page: 'FindSupport' },
    { label: 'Get Involved', page: 'GetInvolved' },
    { label: 'Contact', page: 'Contact' }
  ];

  return (
    <div className="min-h-screen">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');

          :root {
            --color-primary: #3B82F6;
            --color-dark: #1F2937;
            --color-bg: #FFFFFF;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            background-color: var(--color-bg);
            color: #1F2937;
            font-family: 'Fredoka', sans-serif;
          }

          ::selection {
            background-color: #3B82F6;
            color: #FFFFFF;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-3deg); }
            75% { transform: rotate(3deg); }
          }
        `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-white/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to={createPageUrl('Home')} 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png" alt="Hope Bridge" className="relative w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ filter: 'drop-shadow(0 4px 12px rgba(255, 179, 64, 0.4))' }} />
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">Hope Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                    currentPageName === link.page
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-2"
                >
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
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
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white shadow-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      currentPageName === link.page
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to={createPageUrl('Donate')} className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg">
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


      </div>
      );
      }