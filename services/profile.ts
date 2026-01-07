import { db } from '@/database';
import {
  deleteEducationsQuery,
  insertEducationsQuery,
} from '@/database/queries/education';
import {
  deleteExperiencesQuery,
  insertExperiencesQuery,
} from '@/database/queries/experience';
import {
  deleteHistoriesQuery,
  insertHistoriesQuery,
} from '@/database/queries/history';
import {
  getLastProfileUpdateQuery,
  getProfileQuery,
  insertProfileQuery,
} from '@/database/queries/profile';
import { profileTable } from '@/database/schema/profile.schema';
import type { FormDataType } from '@/lib/validation/profile.schema';

export const getProfile = async (language = 'ko') => {
  const [profile] = await getProfileQuery.execute({ language });
  return profile;
};
export const getLastProfileUpdate = async (language = 'ko') => {
  const [profile] = await getLastProfileUpdateQuery.execute({ language });
  return profile.updatedAt;
};

export const updateProfile = async (
  { introduce, experience, education, history }: FormDataType,
  language = 'ko',
) => {
  return await db.transaction(async (tx) => {
    const [profile] = await insertProfileQuery({ introduce }, tx)
      .returning({ id: profileTable.id })
      .execute({ language });

    await deleteExperiencesQuery(tx).execute({ profileId: profile.id });
    await deleteEducationsQuery(tx).execute({ profileId: profile.id });
    await deleteHistoriesQuery(tx).execute({ profileId: profile.id });

    if (experience.length > 0) {
      await insertExperiencesQuery(
        experience.map((e) => ({ ...e, profileId: profile.id })),
        tx,
      );
    }

    if (education.length > 0) {
      await insertEducationsQuery(
        education.map((e) => ({ ...e, profileId: profile.id })),
        tx,
      );
    }

    if (history.length > 0) {
      await insertHistoriesQuery(
        history.map((h, idx) => ({
          ...h,
          order: idx,
          profileId: profile.id,
        })),
        tx,
      );
    }

    return profile;
  });
};
