import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.ContactSubmission.create(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try emailing us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-[#8FA58C]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#8FA58C]" />
            </div>
            <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">
              Message Received
            </h2>
            <p className="text-lg text-[#5C5854] mb-8 leading-relaxed">
              Thank you for reaching out. We'll get back to you within 2-3 business days.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-2 border-[#4A5568] text-[#4A5568] hover:bg-[#F5F2ED]"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-[#F5F2ED] to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#2D3748] leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-[#5C5854] leading-relaxed max-w-2xl mx-auto">
              Whether you're seeking support, interested in partnership, or want to get involved—we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-[#2D3748] mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#4A5568]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D3748] mb-1">Email</h3>
                    <a
                      href="mailto:hopebridgecommunityservices@gmail.com"
                      className="text-[#5C5854] hover:text-[#4A5568] transition-colors"
                    >
                      hopebridgecommunityservices@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#4A5568]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D3748] mb-1">Location</h3>
                    <p className="text-[#5C5854]">
                      Sammamish, Washington<br />
                      Serving King County
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F5F2ED] rounded-2xl p-6"
            >
              <h3 className="font-semibold text-[#2D3748] mb-3">Response Time</h3>
              <p className="text-[#5C5854] text-sm leading-relaxed">
                We typically respond within 2-3 business days. If you're experiencing a mental health crisis, please contact a crisis hotline immediately.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#C4BFB8]/30"
            >
              <h2 className="text-2xl font-semibold text-[#2D3748] mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#2D3748]">Your Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#2D3748]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-[#2D3748]">I am a...</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student seeking support</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="school">School administrator/educator</SelectItem>
                      <SelectItem value="donor">Potential donor/supporter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="organization" className="text-[#2D3748]">
                    School/Organization (if applicable)
                  </Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#2D3748]">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4A5568] hover:bg-[#2D3748] text-[#FAF8F5] py-6 text-lg rounded-xl"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}