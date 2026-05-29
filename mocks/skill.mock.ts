import type { Skill, SkillMetadata } from '@/types/skill';

export const skillMock: Skill[] = [
  { category: 'Front-end', items: ['React', 'TypeScript'] },
  { category: 'Back-end', items: ['Node.js', 'TypeScript'] },
  { category: 'ETC', items: ['Git', 'TypeScript'] },
];

export const skillMetaMock: SkillMetadata[] = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'Git', color: '#F05032' },
];
