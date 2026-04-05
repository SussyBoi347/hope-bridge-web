import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkgbbjkb';

const submitViaNativeForm = (data) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = FORMSPREE_ENDPOINT;
  form.style.display = 'none';
  const entries = { name: data.name, email: data.email, type: data.type, organization: data.organization || '', message: data.message, _subject: `Hope Bridge contact from ${data.name}` };
  Object.entries(entries).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = key; input.value = String(value ?? '');
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', type: '', organization: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries({ ...formData, _subject: `Hope Bridge contact from ${formData.name}` }).forEach(([k, v]) => payload.append(k, v));
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: payload });
      if (!response.ok) throw new Error('Submit failed');
      setIsSubmitted(true);
      toast.success('Message sent!');
    } catch (error) {
      try { submitViaNativeForm(formData); return; } catch {}
      toast.error('Failed to send. Please email us directly.');
    } finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-blue-700 to-blue-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-blue-900 mb-4">Thank you for reaching out</h3>
            <p className="text-blue-700 leading-relaxed">
              We'll get back to you within 2–3 business days. For urgent matters:{' '}
              <a href="mailto:hopebridgecommunityservices@gmail.com" className="text-blue-600 hover:underline font-semibold">
                hopebridgecommunityservices@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-600/20 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-900/50 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Let's start a{' '}
            <span className="bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent">conversation</span>
          </h2>
          <p className="mt-4 text-blue-200 text-lg max-w-2xl mx-auto">
            Whether you're a teen, parent, school, or supporter, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hopebridgecommunityservices@gmail.com', href: 'mailto:hopebridgecommunityservices@gmail.com', shade: 'bg-blue-500/30' },
              { icon: Phone, label: 'Phone', value: '425-610-7760', href: 'tel:425-610-7760', shade: 'bg-blue-600/30' },
              { icon: MapPin, label: 'Location', value: 'Sammamish, Washington', shade: 'bg-blue-700/30' },
            ].map(({ icon: Icon, label, value, href, shade }) => (
              <div key={label} className={`flex items-start gap-4 p-5 rounded-2xl ${shade} border border-blue-500/20 backdrop-blur-sm`}>
                <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-200" />
                </div>
                <div>
                  <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                  {href
                    ? <a href={href} className="text-white font-medium hover:text-blue-200 transition-colors text-sm break-all">{value}</a>
                    : <p className="text-white font-medium text-sm">{value}</p>
                  }
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-3">Follow Our Journey</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://www.instagram.com/hopebridgecommunityservices/', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { href: 'https://www.tiktok.com/@hopebridgecommunity', label: 'TikTok', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' },
                ].map(({ href, label, path }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-400/30 border border-blue-500/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-blue-900/40">
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-800 font-semibold text-sm">Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name" required className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-800 font-semibold text-sm">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com" required className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-800 font-semibold text-sm">I am a...</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger className="border-blue-200 rounded-xl text-gray-900">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent / Family Member</SelectItem>
                      <SelectItem value="school">School Administrator / Counselor</SelectItem>
                      <SelectItem value="donor">Potential Donor / Supporter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(formData.type === 'school' || formData.type === 'donor') && (
                  <div className="space-y-2">
                    <Label className="text-blue-800 font-semibold text-sm">Organization (optional)</Label>
                    <Input value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="School or organization name" className="border-blue-200 rounded-xl text-gray-900" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-800 font-semibold text-sm">Message</Label>
                  <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?" rows={4} required className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none rounded-xl text-gray-900" />
                </div>
                <Button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-xl shadow-lg shadow-blue-500/20 font-bold text-base">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</> : <><Send className="w-5 h-5 mr-2" />Send Message</>}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
