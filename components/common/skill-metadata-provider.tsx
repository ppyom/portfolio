'use client';

import { createContext, useContext } from 'react';

import type { SkillMetadata } from '@/types/skill';

const Context = createContext<Record<string, SkillMetadata>>({});

interface Props {
  children: React.ReactNode;
  metadata: Record<string, SkillMetadata>;
}

export default function SkillMetadataProvider({ children, metadata }: Props) {
  return <Context value={metadata}>{children}</Context>;
}

export const useSkillMetadataContext = () => {
  return useContext(Context);
};
