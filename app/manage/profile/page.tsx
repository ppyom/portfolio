import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { getProfile } from '@/services/profile';
import { LanguageTabs } from '@/components/admin/layout';
import { ProfileEditForm } from '@/components/admin/profile/profile-edit-form';
import { ResumeUpload } from '@/components/admin/profile/resume-upload';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: '프로필 관리',
};

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });

export default async function Page({ searchParams }: Props) {
  const { lang } = await searchParams;

  // 지원하지 않는 언어는 기본 언어 탭으로 보낸다
  if (lang !== undefined && !hasLocale(routing.locales, lang)) {
    return redirect('/manage/profile');
  }
  const language = lang ?? routing.defaultLocale;

  const profile = await getProfile(language);
  const isFallback = !profile && language !== routing.defaultLocale;
  // 날짜 등 언어와 무관한 값을 다시 입력하지 않도록, 새 언어 프로필은 한국어 프로필로 미리 채운다
  // 폼 기본값에는 행 id가 들어가지 않아 저장 시 한국어 행과 충돌하지 않는다
  const formProfile = isFallback
    ? await getProfile(routing.defaultLocale)
    : profile;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex-1 space-y-2">
        <p className="text-2xl font-bold">프로필 관리</p>
        <p className="text-text-secondary">
          이력서와 자기소개, 경력, 학력 및 이력 정보를 관리하고 표시 순서를
          조정할 수 있습니다.
        </p>
      </div>
      <LanguageTabs basePath="/manage/profile" current={language} />
      {isFallback && (
        <p className="rounded-md bg-surface-secondary px-4 py-3 text-sm text-text-secondary">
          아직 {languageNames.of(language)} 프로필이 없어 방문자에게는 한국어
          프로필이 표시됩니다. 아래 내용은 한국어 프로필에서 가져왔으니 번역해서
          저장하세요.
        </p>
      )}
      <ResumeUpload
        key={`resume-${language}`}
        language={language}
        resumeUrl={profile?.resumeUrl}
      />
      <ProfileEditForm
        key={`profile-${language}`}
        language={language}
        defaultProfile={formProfile}
      />
    </div>
  );
}
