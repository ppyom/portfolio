'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, Undo2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  defaultKeyword?: string;
}

export function SearchForm({ defaultKeyword = '' }: Props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(defaultKeyword);

  const handleReset = () => {
    setKeyword('');
    router.push('/projects');
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/projects?q=${keyword}`);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <Input
        className="flex-1"
        value={keyword}
        onChange={({ target }) => setKeyword(target.value)}
        placeholder="프로젝트, 기술 스택, 카테고리를 검색해보세요."
      />
      {!!defaultKeyword && (
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          title="입력 초기화"
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
