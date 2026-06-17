'use client';

import { createContext, useContext } from 'react';

import type { SkillMetadata } from '@/types/skill';

export const SkillMetadataContext = createContext<
  Record<string, SkillMetadata>
>({});

export const useSkillMetadataContext = () => {
  return useContext(SkillMetadataContext);
};
