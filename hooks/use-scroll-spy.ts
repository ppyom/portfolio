import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // intersecting 중에서 가장 많이 보이는 섹션 선택
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce((prev, curr) =>
          prev.intersectionRatio > curr.intersectionRatio ? prev : curr,
        );

        setActiveId(mostVisible.target.id);
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75], // ⭐ 핵심
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
