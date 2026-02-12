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
    { label: 'Get Involved', page: 'GetInvolved' },
    { label: 'Contact', page: 'Contact' }
  ];

  return (
    <div className="min-h-screen">
      <style>{`
        :root {
          --color-primary: #00D9FF;
          --color-primary-dark: #0088CC;
          --color-accent: #00FFF0;
          --color-dark: #0A0A0F;
          --color-darker: #050508;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--color-dark);
          color: #ffffff;
        }

        ::selection {
          background-color: rgba(0, 217, 255, 0.3);
          color: #ffffff;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20' 
            : 'bg-transparent'
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
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png" alt="Hope Bridge" className="relative w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[0_0_25px_rgba(0,217,255,0.8)] brightness-110 contrast-125 saturate-150" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">Hope Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPageName === link.page
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-[0_0_20px_rgba(0,217,255,0.6)]'
                      : 'text-white hover:text-white hover:bg-white/10 border border-white/30 hover:border-white/60'
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
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold rounded-full px-8 shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all duration-300 border border-cyan-400/50"
                >
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-cyan-300 transition-colors"
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
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 ${
                      currentPageName === link.page
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium shadow-[0_0_20px_rgba(0,217,255,0.5)]'
                        : 'text-white hover:text-white hover:bg-white/10 border border-white/40'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to={createPageUrl('Donate')} className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold rounded-full shadow-[0_0_30px_rgba(0,217,255,0.5)]">
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