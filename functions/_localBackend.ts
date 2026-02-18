export type Story = {
  id: string;
  title: string;
  author_name: string;
  content: string;
  topic: string;
  media_urls?: string[];
  audio_url?: string | null;
  summary?: string;
  tags?: string[];
  status?: string;
  comments_count?: number;
  likes?: number;
  created_date: string;
};

const stories = new Map<string, Story>();

export const resources = [
  {
    id: 'resource_1',
    title: 'Managing Academic Pressure',
    type: 'guide',
    categories: ['academic_stress'],
    tags: ['school_pressure', 'coping_skills'],
    difficulty_level: 'beginner',
    reading_time: 8,
    description: 'Practical ways to reduce burnout while balancing school and life.'
  },
  {
    id: 'resource_2',
    title: 'Family Communication Toolkit',
    type: 'article',
    categories: ['family_pressures'],
    tags: ['communication', 'family_expectations'],
    difficulty_level: 'beginner',
    reading_time: 6,
    description: 'Conversation strategies for navigating expectations with family.'
  },
  {
    id: 'resource_3',
    title: 'Identity Reflection Prompts',
    type: 'worksheet',
    categories: ['cultural_identity'],
    tags: ['identity', 'belonging'],
    difficulty_level: 'beginner',
    reading_time: 10,
    description: 'Guided prompts to reflect on identity and belonging.'
  }
];

export const mentors = [
  {
    id: 'mentor_1',
    name: 'Alyssa',
    age: 20,
    status: 'active',
    expertise: ['academic_stress', 'family_pressures'],
    interests: ['music', 'journaling'],
    availability: 'weekday evenings',
    bio: 'Peer mentor focused on school stress and family communication.'
  },
  {
    id: 'mentor_2',
    name: 'Kevin',
    age: 22,
    status: 'active',
    expertise: ['cultural_identity', 'belonging'],
    interests: ['art', 'sports'],
    availability: 'weekends',
    bio: 'Supports identity exploration and confidence building.'
  }
];

export const supportGroups = [
  {
    id: 'group_1',
    name: 'Academic Stress Circle',
    status: 'open',
    focus_areas: ['academic_stress'],
    age_range: '13-18',
    meeting_schedule: 'Wednesdays 6 PM',
    meeting_format: 'online',
    current_members: 9,
    max_members: 15,
    description: 'Weekly support group for handling school pressure.'
  },
  {
    id: 'group_2',
    name: 'Identity & Belonging Circle',
    status: 'open',
    focus_areas: ['cultural_identity', 'family_pressures'],
    age_range: '14-19',
    meeting_schedule: 'Saturdays 11 AM',
    meeting_format: 'hybrid',
    current_members: 7,
    max_members: 12,
    description: 'A safe space to discuss identity and family dynamics.'
  }
];

const rand = () => Math.random().toString(36).slice(2, 10);

export const createStory = (story: Omit<Story, 'id' | 'created_date'>) => {
  const id = `story_${rand()}`;
  const record: Story = {
    ...story,
    id,
    created_date: new Date().toISOString()
  };
  stories.set(id, record);
  return record;
};

export const updateStory = (id: string, patch: Partial<Story>) => {
  const existing = stories.get(id);
  if (!existing) {
    return null;
  }
  const next = { ...existing, ...patch };
  stories.set(id, next);
  return next;
};

export const summarize = (text: string) =>
  (text || '').length > 180 ? `${text.slice(0, 177)}...` : text;

export const inferTags = (text: string, topic?: string) => {
  const base = (text || '').toLowerCase();
  const tags = new Set<string>();
  if (topic) tags.add(topic);
  if (base.includes('family')) tags.add('family_expectations');
  if (base.includes('school') || base.includes('grade')) tags.add('school_pressure');
  if (base.includes('identity')) tags.add('identity');
  if (base.includes('stress') || base.includes('anx')) tags.add('mental_health');
  return Array.from(tags).slice(0, 5);
};
