'use server';

import { revalidatePath } from 'next/cache';

import {
  createProject,
  deleteProject,
  updateProject,
  updateProjectOrder,
  updateProjectVisibility,
} from '@/services/project';
import { extractErrorMessage } from '@/lib/utils/error';
import { parseProjectFormData } from '@/lib/utils/parse-project-form-data';

export async function createProjectAction(formData: FormData) {
  const project = parseProjectFormData(formData);

  try {
    const result = await createProject(project);

    revalidatePath('/manage/projects');
    revalidatePath('/projects');

    return { success: true, projectId: result.id };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
}

export async function updateProjectAction(formData: FormData, id: string) {
  if (!id) {
    return { success: false, message: '존재하지 않는 프로젝트입니다.' };
  }

  const project = parseProjectFormData(formData);

  try {
    await updateProject(id, project);

    revalidatePath('/manage/projects');
    revalidatePath(`/projects/${id}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
}

export async function updateProjectVisibilityAction(
  id: string,
  isPublic: boolean,
) {
  try {
    await updateProjectVisibility(id, isPublic);

    revalidatePath('/manage/projects');
    revalidatePath(`/projects/${id}`);

    return { success: true, projectId: id };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
}

export async function updateProjectOrderAction(projectIds: string[]) {
  try {
    await updateProjectOrder(projectIds);

    revalidatePath('/manage/projects');
    revalidatePath(`/projects`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
}

export async function deleteProjectAction(id: string) {
  if (!id) {
    return { success: false, message: '존재하지 않는 프로젝트입니다.' };
  }

  try {
    await deleteProject(id);

    revalidatePath('/manage/projects');
    revalidatePath('/projects');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
}
