'use server';

import type { FormDataType } from '@/components/admin/profile/profile-edit-form';
import { db } from '@/database';
import { profileTable } from '@/database/schema/profile.schema';
import { experienceTable } from '@/database/schema/experience.schema';
import { eq } from 'drizzle-orm';
import { educationTable } from '@/database/schema/education.schema';
import { revalidatePath } from 'next/cache';

export const updateProfileAction = async ({
  introduce,
  education,
  experience,
}: FormDataType) => {
  try {
    const result = await db.transaction(async (tx) => {
      const [profile] = await tx
        .insert(profileTable)
        .values({
          language: 'ko',
          introduce,
        })
        .onConflictDoUpdate({
          target: profileTable.language,
          set: {
            introduce,
          },
        })
        .returning({ id: profileTable.id });

      await tx
        .delete(experienceTable)
        .where(eq(experienceTable.profileId, profile.id));
      await tx
        .delete(educationTable)
        .where(eq(educationTable.profileId, profile.id));

      if (experience.length > 0) {
        await tx
          .insert(experienceTable)
          .values(experience.map((e) => ({ ...e, profileId: profile.id })));
      }

      if (education.length > 0) {
        await tx
          .insert(educationTable)
          .values(education.map((e) => ({ ...e, profileId: profile.id })));
      }

      return profile;
    });

    revalidatePath('/manage/profile');

    return { success: true, projectId: result.id };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
};
