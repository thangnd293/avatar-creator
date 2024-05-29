import { RefObject, useEffect, useState } from "react";

interface UseResizeObserverOptions<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T>;
}

export function useResizeObserver({ ref }: UseResizeObserverOptions) {
  const [{ width, height }, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return {
    width,
    height,
  };
}
