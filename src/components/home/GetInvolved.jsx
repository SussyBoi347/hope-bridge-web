import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const pathways = [
  {
    title: "Students",
    description: "Explore our programs, attend a workshop, or simply reach out when you need someone who understands.",
    cta: "Find Support",
    page: "GetSupport"
  },
  {
    title: "Parents & Families",
    description: "Access resources designed to help you understand and support your teen's mental health journey.",
    cta: "Learn More",
    page: "GetSupport"
  },
  {
    title: "Schools & Organizations",
    description: "Partner with us to bring mental health awareness and support programs to your students.",
    cta: "Partner With Us",
    page: "Partnerships"
  },
  {
    title: "Supporters & Donors",
    description: "Your contribution helps us keep all programs free and accessible to every teen who needs them.",
    cta: "Support Our Work",
    page: "Donate"
  }
];

export default function GetInvolved() {

  return (
    <section id="get-involved" className="py-24 lg:py-32 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            Get Involved
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            There's a place for you here
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Whether you're a teen seeking support, a parent wanting to help, or 
            an organization ready to make a difference, you belong in this community.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-7 grid md:grid-cols-4 gap-4 items-center"
            >
              <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">0{index + 1}</span>
              <h3 className="text-lg font-semibold text-slate-900">
                {pathway.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {pathway.description}
              </p>
              <div className="md:text-right">
                <Link to={createPageUrl(pathway.page)}>
                  <Button variant="ghost" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors px-0 md:px-4">
                    {pathway.cta} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}