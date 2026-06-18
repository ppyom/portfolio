import type { Skill, SkillMetadata } from '@/types/skill';

export const skillMock: Skill[] = [
  {
    category: 'Front-end',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  { category: 'Back-end', items: ['Node.js', 'Nest.js', 'PostgreSQL'] },
  { category: 'Design Tools', items: ['Figma', 'Storybook'] },
  { category: 'Other', items: ['Git'] },
];

export const skillMetaMock: SkillMetadata[] = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'Nest.js', color: '#E0234E' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Storybook', color: '#FF4785' },
  { name: 'Git', color: '#F05032' },
  { name: 'Supabase', color: '#3FCF8E' },
  { name: 'ReactQuery', color: '#FF4154' },
  { name: 'Zustand', color: '#DAAC00' },
  { name: 'Emotion', color: '#C43BAD' },
];
