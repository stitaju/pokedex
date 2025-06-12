import { useEffect } from 'react';

export function useHorizontalScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return; // skip if no vertical scroll
      e.preventDefault();         // block vertical scroll
      el.scrollLeft += e.deltaY;  // scroll horizontally
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [ref]);
}
