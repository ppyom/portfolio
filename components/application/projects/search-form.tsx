'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchIcon, Undo2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';

interface Props {
  defaultKeyword?: string;
}

export function SearchForm({ defaultKeyword = '' }: Props) {
  const t = useTranslations('Projects');
  const router = useRouter();
  const [keyword, setKeyword] = useState(defaultKeyword);

  const handleReset = () => {
    setKeyword('');
    router.push('/projects');
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/projects?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <Input
        className="flex-1"
        value={keyword}
        onChange={({ target }) => setKeyword(target.value)}
        placeholder={t('searchPlaceholder')}
      />
      {!!defaultKeyword && (
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          title={t('resetSearch')}
        >
          <Undo2Icon size={14} />
        </Button>
      )}
      <Button className="flex" type="submit">
        <SearchIcon size={14} />
      </Button>
    </form>
  );
}
