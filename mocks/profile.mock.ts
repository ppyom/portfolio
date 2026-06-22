import type { Profile } from '@/types/profile';

export const profileMock: Profile = {
  id: '1',
  language: 'ko',
  introduce: [
    'Aliquam ultrices, ante non imperdiet lacinia, diam tortor eleifend erat, eu dapibus tortor nibh id risus. Vivamus eleifend mauris eu bibendum laoreet. Curabitur laoreet, diam ac feugiat vehicula, mi ex dapibus leo, eu lacinia neque felis id augue. Sed interdum nulla lobortis quam tincidunt blandit. Suspendisse eu est erat.',
    'Cras varius velit est. Mauris commodo vitae orci ac suscipit. Nulla a nulla suscipit, porta nisl ac, semper ante. Aenean eget diam vestibulum, accumsan lorem quis, bibendum turpis. Sed a pharetra tellus. Vivamus ut massa nulla. Phasellus bibendum sapien ac fermentum feugiat. Suspendisse vel leo molestie, iaculis velit a, molestie augue. ',
    'Nullam dui arcu, venenatis id pellentesque vel, commodo id purus. Vestibulum lorem metus, venenatis eu velit a, tristique congue libero. Mauris cursus, ante eu accumsan pulvinar, nisi nulla pretium turpis, non hendrerit quam ligula ut enim. In quis metus faucibus, dictum quam ac, ultrices arcu. Phasellus finibus sodales convallis.',
  ],
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
      description:
        'Curabitur laoreet, diam ac feugiat vehicula, mi ex dapibus leo, eu lacinia neque felis id augue. Sed interdum nulla lobortis quam tincidunt blandit.',
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      profileId: '1',
      type: 'learning',
      name: 'Learning',
      date: '2026.05 - 2026.06',
      description: '',
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      profileId: '1',
      type: 'certification',
      name: 'Certification',
      date: '2026.05',
      description: '',
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
