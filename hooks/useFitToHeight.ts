"use client";

import { RefObject, useEffect, useState } from "react";

export function useFitToHeight(
  containerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  mediaQuery = "(min-width: 1024px)"
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const mql = window.matchMedia(mediaQuery);

    const update = () => {
      if (!mql.matches) {
        setScale(1);
        return;
      }
      const styles = window.getComputedStyle(container);
      const available =
        container.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      const natural = content.offsetHeight;
      setScale(natural > 0 ? Math.min(1, available / natural) : 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(content);
    mql.addEventListener("change", update);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", update);
    };
  }, [containerRef, contentRef, mediaQuery]);

  return scale;
}
