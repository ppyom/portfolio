import type { Profile } from '@/types/profile';

export const profileMock: Profile = {
  id: '1',
  language: 'ko',
  introduce: ['PROFILE'],
  experience: [
    {
      id: '1',
      profileId: '1',
      name: 'EXP 1',
      position: 'EXP 1',
      startDate: '2026.05',
      endDate: '2026.06',
      description: 'Experience 1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  education: [
    {
      id: '1',
      profileId: '1',
      name: 'EDU 1',
      major: 'EDU 1',
      startDate: '2026.05',
      endDate: '2026.06',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  history: [
    {
      id: '1',
      profileId: '1',
      type: 'activity',
      name: 'Activity',
      date: '2026.05 - 2026.06',
      description: 'Activity',
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
