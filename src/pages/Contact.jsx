import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.ContactSubmission.create(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', type: '', organization: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try emailing us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Thank you for reaching out!
          </h2>
          <p className="text-slate-600 mb-8">
            We'll get back to you within 24-48 hours.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="rounded-full"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

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
              Let's{' '}
              <span className="bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] bg-clip-text text-transparent">
                connect
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Whether you're seeking support, want to partner with us, or have questions about 
              our programs, we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">I am a... *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="school">School Representative</SelectItem>
                      <SelectItem value="donor">Potential Donor/Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organization">School/Organization (optional)</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 rounded-xl"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#5B4E77] to-[#7B9AB8] hover:from-[#3F3351] hover:to-[#5B4E77] text-white rounded-xl py-6 text-lg shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white/50 to-[#E8EEF3]/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <Mail className="w-8 h-8 text-[#5B4E77] mx-auto md:mx-0 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Us</h3>
              <a
                href="mailto:hopebridgecommunityservices@gmail.com"
                className="text-[#5B4E77] hover:underline"
              >
                hopebridgecommunityservices@gmail.com
              </a>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-[#5B4E77] mx-auto md:mx-0 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Location</h3>
              <p className="text-slate-600">Sammamish, WA</p>
              <p className="text-slate-600">Serving King County</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}