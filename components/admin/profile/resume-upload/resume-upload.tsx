'use client';

import { useRef, useTransition } from 'react';
import { FileTextIcon, UploadIcon } from 'lucide-react';

import {
  deleteResumeAction,
  uploadResumeAction,
} from '@/app/manage/profile/actions';
import { notifyError } from '@/lib/utils/error';
import { RESUME_MAX_SIZE_MB, schema } from '@/lib/validation/resume.schema';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/ui/form-section';
import { toast } from '@/components/ui/toast';
import { DeleteButton, DeleteDialog } from '@/components/delete';
import type { Locale } from '@/i18n/routing';

import { getResumeFileName } from './resume-upload.utils';

interface Props {
  language: Locale;
  resumeUrl?: string | null;
}

export function ResumeUpload({ language, resumeUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // 같은 파일을 다시 골라도 change 이벤트가 발생하도록 비운다
    event.target.value = '';

    const parsed = schema.safeParse({ file });
    if (!parsed.success) {
      notifyError(parsed.error.issues[0]);
      return;
    }

    const formData = new FormData();
    formData.append('file', parsed.data.file);

    startTransition(async () => {
      const result = await uploadResumeAction(formData, language);

      if (result.success) {
        toast.success('이력서가 업로드되었습니다.');
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = async () => {
    const result = await deleteResumeAction(language);

    if (result.success) {
      toast.success('이력서가 삭제되었습니다.');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <FormSection
      title="이력서"
      description={`방문자가 다운로드할 이력서를 업로드합니다. PDF, 최대 ${RESUME_MAX_SIZE_MB}MB`}
    >
      <div className="flex flex-wrap items-center gap-3">
        {resumeUrl ? (
          <a
            className="flex flex-1 min-w-0 items-center gap-2 font-medium underline-offset-2 hover:underline"
            href={resumeUrl}
          >
            <FileTextIcon className="shrink-0" size={16} aria-hidden="true" />
            <span className="truncate">{getResumeFileName(resumeUrl)}</span>
          </a>
        ) : (
          <p className="flex-1 text-text-muted">업로드된 이력서가 없습니다.</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-2"
          isLoading={isPending}
          onClick={() => inputRef.current?.click()}
        >
          {!isPending && <UploadIcon size={14} aria-hidden="true" />}
          {resumeUrl ? '교체' : '업로드'}
        </Button>
        {resumeUrl && (
          <DeleteDialog
            title="이력서를 삭제하시겠습니까?"
            description="삭제하면 방문자 페이지의 이력서 다운로드 버튼이 사라집니다."
            onConfirm={handleDelete}
          >
            <DeleteButton aria-label="이력서 삭제" disabled={isPending} />
          </DeleteDialog>
        )}
      </div>
    </FormSection>
  );
}
