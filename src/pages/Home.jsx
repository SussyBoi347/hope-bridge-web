import React from 'react';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import Programs from '@/components/home/Programs';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Partnerships from '@/components/home/Partnerships';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Mission />
      <Problem />
      <Programs />
      <CommunitySurvey />
      <Impact />
      <GetInvolved />
      <Partnerships />
      <Contact />
      <Footer />
    </div>
  );
}