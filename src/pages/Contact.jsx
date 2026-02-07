import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;
const MAX_ORG_LENGTH = 150;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    organization: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'type':
        if (!value) {
          newErrors.type = 'Please select a category';
        } else {
          delete newErrors.type;
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isTypeValid = validateField('type', formData.type);
    const isMessageValid = validateField('message', formData.message);
    
    if (!isNameValid || !isEmailValid || !isTypeValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await base44.entities.ContactSubmission.create(formData);
      await base44.functions.invoke('sendContactEmail', formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', type: '', organization: '', message: '' });
      setTouched({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">
            Thank you for reaching out!
          </h2>
          <p className="text-white mb-8">
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
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Let's{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                connect
              </span>
            </h1>
            <p className="mt-6 text-lg text-white leading-relaxed max-w-2xl mx-auto">
              Whether you're seeking support, want to partner with us, or have questions about 
              our programs, we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <Label htmlFor="name">Name *</Label>
                    <span className={`text-xs ${formData.name.length > 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                      {formData.name.length}/{MAX_NAME_LENGTH}
                    </span>
                  </div>
                  <Input
                    id="name"
                    maxLength={MAX_NAME_LENGTH}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`mt-2 rounded-xl transition-colors text-black ${
                      errors.name && touched.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && touched.name && (
                    <motion.p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`mt-2 rounded-xl transition-colors text-black ${
                      errors.email && touched.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && touched.email && (
                    <motion.p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">I am a... *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <SelectTrigger className={`mt-2 rounded-xl transition-colors text-black ${
                      errors.type && touched.type 
                        ? 'border-red-500' 
                        : 'border-gray-200'
                    }`}>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="school">School Representative</SelectItem>
                      <SelectItem value="donor">Potential Donor/Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && touched.type && (
                    <motion.p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.type}
                    </motion.p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <Label htmlFor="organization">School/Organization (optional)</Label>
                    <span className={`text-xs ${formData.organization.length > 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                      {formData.organization.length}/{MAX_ORG_LENGTH}
                    </span>
                  </div>
                  <Input
                    id="organization"
                    maxLength={MAX_ORG_LENGTH}
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="mt-2 rounded-xl border-gray-200 text-black"
                    placeholder="e.g., Lincoln High School"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <Label htmlFor="message">Message *</Label>
                  <span className={`text-xs ${
                    formData.message.length > MAX_MESSAGE_LENGTH * 0.9
                      ? 'text-orange-600'
                      : formData.message.length > 0
                      ? 'text-gray-500'
                      : 'text-gray-400'
                  }`}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <Textarea
                  id="message"
                  maxLength={MAX_MESSAGE_LENGTH}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`mt-2 rounded-xl transition-colors resize-none text-black ${
                    errors.message && touched.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-200'
                  }`}
                  placeholder="Tell us how we can help... (minimum 10 characters)"
                />
                {errors.message && touched.message && (
                  <motion.p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-6 text-lg shadow-md transition-all"
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
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="text-center px-4">
              <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
              <a
                href="mailto:hopebridgecommunityservices@gmail.com"
                className="text-white hover:text-cyan-400 underline transition-colors"
              >
                hopebridgecommunityservices@gmail.com
              </a>
            </div>
            <div className="text-center px-4">
              <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
              <a
                href="tel:425-610-7760"
                className="text-white hover:text-cyan-400 underline transition-colors"
              >
                425-610-7760
              </a>
            </div>
            <div className="text-center px-4">
              <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-white">Sammamish, WA</p>
              <p className="text-white">Serving King County</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}