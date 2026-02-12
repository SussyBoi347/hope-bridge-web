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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Thank you for reaching out!
          </h2>
          <p className="text-gray-600 mb-8">
            We'll get back to you within 24-48 hours.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background Elements - Large Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated clouds - very visible */}
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, 20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-0 w-[500px] h-64 bg-gradient-to-r from-blue-300/70 to-blue-200/60 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -15, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-0 w-[600px] h-72 bg-gradient-to-l from-blue-400/60 to-blue-300/50 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, 90, 0], y: [0, 30, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[450px] h-56 bg-blue-200/80 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 25, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[520px] h-64 bg-gradient-to-r from-blue-300/70 to-blue-400/50 rounded-full blur-[125px]"
        />
        
        {/* Smaller accent clouds */}
        <motion.div
          animate={{ x: [0, 70, 0], y: [0, 15, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-2/3 left-10 w-72 h-36 bg-blue-200/65 rounded-full blur-[90px]"
        />
        
        {/* Floating circles with opacity animation */}
        <motion.div
          animate={{ y: [0, -50, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-52 h-52 bg-blue-500/35 rounded-full blur-[70px]"
        />
        <motion.div
          animate={{ y: [0, 60, 0], scale: [1, 1.4, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-400/40 rounded-full blur-[80px]"
        />
        
        {/* Prominent bridge design at bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-80 opacity-50" viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0,160 Q300,50 600,160 T1200,160 L1200,280 L0,280 Z" fill="url(#bridgeGradient)" />
          <defs>
            <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F2937" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <path d="M0,170 Q300,60 600,170 T1200,170" stroke="#1F2937" strokeWidth="6" fill="none" opacity="0.7" />
          <path d="M0,180 Q300,70 600,180 T1200,180" stroke="#374151" strokeWidth="5" fill="none" opacity="0.6" />
          
          <g opacity="0.8">
            <rect x="270" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
            <rect x="275" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
            
            <rect x="570" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
            <rect x="575" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
            
            <rect x="870" y="160" width="60" height="120" fill="url(#pillarGradient)" rx="6" />
            <rect x="875" y="155" width="50" height="12" fill="#374151" rx="3" opacity="0.9" />
          </g>
        </svg>
        
        {/* Decorative dots patterns */}
        <div className="absolute top-48 right-20 opacity-40">
          <div className="grid grid-cols-5 gap-3">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                className="w-2 h-2 bg-blue-600 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Let's{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                connect
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium">
              Whether you're seeking support, want to partner with us, or have questions about 
              our programs, we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-blue-200"
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
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-6 text-lg shadow-md transition-all hover:scale-105 duration-300"
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
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Get in <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center px-6 py-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <a
                href="mailto:hopebridgecommunityservices@gmail.com"
                className="text-blue-600 hover:text-blue-700 underline transition-colors text-sm break-words"
              >
                hopebridgecommunityservices@gmail.com
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center px-6 py-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <a
                href="tel:425-610-7760"
                className="text-blue-600 hover:text-blue-700 underline transition-colors"
              >
                425-610-7760
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-center px-6 py-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-700">Sammamish, WA</p>
              <p className="text-gray-600 text-sm">Serving King County</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}