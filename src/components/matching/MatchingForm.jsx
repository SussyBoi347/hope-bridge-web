import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

const commonChallenges = [
  'Academic Stress',
  'Family Pressure',
  'Cultural Identity',
  'Social Anxiety',
  'Depression',
  'Loneliness',
  'Peer Relationships',
  'Future Uncertainty'
];

const commonInterests = [
  'Art & Music',
  'Sports & Fitness',
  'Reading & Writing',
  'Gaming',
  'Cooking',
  'Technology',
  'Volunteering',
  'Nature & Outdoors'
];

export default function MatchingForm({ onMatch, isLoading, variant = 'default' }) {
  const isDark = variant === 'default';
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    challenges: [],
    interests: [],
    preferences: '',
    availability: ''
  });

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onMatch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className={isDark ? "text-white" : "text-gray-900"}>Preferred Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={isDark ? "mt-2 bg-white/10 border-blue-300 text-white" : "mt-2 bg-white border-blue-200 text-gray-900"}
            placeholder="How should we call you?"
          />
        </div>

        <div>
          <Label htmlFor="age" className={isDark ? "text-white" : "text-gray-900"}>Age *</Label>
          <Input
            id="age"
            type="number"
            min="13"
            max="25"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            className={isDark ? "mt-2 bg-white/10 border-blue-300 text-white" : "mt-2 bg-white border-blue-200 text-gray-900"}
            placeholder="Your age"
          />
        </div>
      </div>

      <div>
        <Label className={isDark ? "text-white mb-3 block" : "text-gray-900 mb-3 block"}>What challenges are you facing? *</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {commonChallenges.map(challenge => (
            <div key={challenge} className="flex items-center gap-2">
              <Checkbox
                id={challenge}
                checked={formData.challenges.includes(challenge)}
                onCheckedChange={() => handleCheckboxChange('challenges', challenge)}
                className={isDark ? "border-blue-300" : "border-blue-600"}
              />
              <label htmlFor={challenge} className={isDark ? "text-gray-300 text-sm cursor-pointer" : "text-gray-700 text-sm cursor-pointer"}>
                {challenge}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className={isDark ? "text-white mb-3 block" : "text-gray-900 mb-3 block"}>Your interests</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {commonInterests.map(interest => (
            <div key={interest} className="flex items-center gap-2">
              <Checkbox
                id={interest}
                checked={formData.interests.includes(interest)}
                onCheckedChange={() => handleCheckboxChange('interests', interest)}
                className={isDark ? "border-blue-300" : "border-blue-600"}
              />
              <label htmlFor={interest} className={isDark ? "text-gray-300 text-sm cursor-pointer" : "text-gray-700 text-sm cursor-pointer"}>
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="preferences" className={isDark ? "text-white" : "text-gray-900"}>What kind of support are you looking for?</Label>
        <Textarea
          id="preferences"
          value={formData.preferences}
          onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
          className={isDark ? "mt-2 bg-white/10 border-blue-300 text-white min-h-[100px]" : "mt-2 bg-white border-blue-200 text-gray-900 min-h-[100px]"}
          placeholder="Tell us what would help you most right now..."
        />
      </div>

      <div>
        <Label htmlFor="availability" className={isDark ? "text-white" : "text-gray-900"}>When are you available?</Label>
        <Input
          id="availability"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          className={isDark ? "mt-2 bg-white/10 border-blue-300 text-white" : "mt-2 bg-white border-blue-200 text-gray-900"}
          placeholder="e.g., Weekday evenings, Weekend afternoons"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || formData.challenges.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Finding Your Matches...
          </>
        ) : (
          'Find My Matches'
        )}
      </Button>
    </form>
  );
}