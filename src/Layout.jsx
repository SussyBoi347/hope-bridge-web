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

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { label: 'Mission', id: 'mission' },
    { label: 'Programs', id: 'programs' },
    { label: 'Impact', id: 'impact' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-screen">
      <style>{`
        :root {
          --color-primary: #2563EB;
          --color-primary-dark: #1E40AF;
          --color-accent: #60A5FA;
        }
        
        html {
          scroll-behavior: smooth;
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
              className="flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-400/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">Hope Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={createPageUrl('Donate')}>
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  Donate
                </Button>
              </Link>
              <Button
                onClick={() => scrollToSection('get-involved')}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full px-6 shadow-lg shadow-blue-500/25"
              >
                Get Support
              </Button>
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
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link to={createPageUrl('Donate')} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-slate-200 text-slate-700"
                    >
                      Donate
                    </Button>
                  </Link>
                  <Button
                    onClick={() => scrollToSection('get-involved')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                  >
                    Get Support
                  </Button>
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