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

  const navLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'Get Support', page: 'GetSupport' },
    { label: 'Programs', page: 'Programs' },
    { label: 'Schools', page: 'Schools' },
    { label: 'Get Involved', page: 'GetInvolved' },
    { label: 'About', page: 'About' },
    { label: 'Contact', page: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#C4BFB8]/30' 
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
              <div className="w-10 h-10 rounded-xl bg-[#4A5568] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#FAF8F5]" />
              </div>
              <span className="text-xl font-semibold text-[#2D3748]">Hope Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    currentPageName === link.page
                      ? 'text-[#4A5568] bg-[#F5F2ED]'
                      : 'text-[#8B8680] hover:text-[#4A5568] hover:bg-[#F5F2ED]'
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
                  className="bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] rounded-full px-6"
                >
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#8B8680] hover:text-[#4A5568]"
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
              className="lg:hidden bg-[#FAF8F5] border-t border-[#C4BFB8]/30 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-[#8B8680] hover:text-[#4A5568] hover:bg-[#F5F2ED] rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to={createPageUrl('Donate')} className="w-full block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5]">
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

      {/* Footer */}
      <footer className="bg-[#2D3748] text-[#FAF8F5] py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#8FA58C] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#FAF8F5]" />
                </div>
                <span className="text-xl font-semibold">Hope Bridge</span>
              </div>
              <p className="text-[#C4BFB8] leading-relaxed max-w-md">
                Creating safe, culturally aware mental health support for Asian teens navigating school, family expectations, and identity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link to={createPageUrl(link.page)} className="text-[#C4BFB8] hover:text-[#8FA58C] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-[#C4BFB8] text-sm leading-relaxed">
                Sammamish, WA<br />
                <a href="mailto:hopebridgecommunityservices@gmail.com" className="hover:text-[#8FA58C] transition-colors">
                  hopebridgecommunityservices@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-[#4A5568] pt-8 text-center text-[#C4BFB8] text-sm">
            © {new Date().getFullYear()} Hope Bridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}