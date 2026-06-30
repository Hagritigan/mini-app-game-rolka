import { useLayoutEffect } from 'react';

const CARD_SELECTOR = '.achievement-card';
const FOOTER_SELECTOR = '.achievement-card__points';
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

function getColumnsCount() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches ? 2 : 1;
}

function resetFooterHeights(container) {
  container.querySelectorAll(FOOTER_SELECTOR).forEach((footer) => {
    footer.style.removeProperty('min-height');
  });
}

function syncFooterHeights(container) {
  resetFooterHeights(container);

  const cards = [...container.querySelectorAll(CARD_SELECTOR)];
  if (!cards.length) {
    return;
  }

  const columns = getColumnsCount();

  for (let index = 0; index < cards.length; index += columns) {
    const rowFooters = cards
      .slice(index, index + columns)
      .map((card) => card.querySelector(FOOTER_SELECTOR))
      .filter(Boolean);

    if (!rowFooters.length) {
      continue;
    }

    const maxHeight = Math.max(
      ...rowFooters.map((footer) => footer.getBoundingClientRect().height),
    );

    rowFooters.forEach((footer) => {
      footer.style.minHeight = `${Math.ceil(maxHeight)}px`;
    });
  }
}

export function useEqualCardFooters(containerRef, dependency) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const handleSync = () => syncFooterHeights(container);

    handleSync();

    const resizeObserver = new ResizeObserver(handleSync);
    resizeObserver.observe(container);

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    mediaQuery.addEventListener('change', handleSync);
    window.addEventListener('resize', handleSync);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', handleSync);
      window.removeEventListener('resize', handleSync);
      resetFooterHeights(container);
    };
  }, [containerRef, dependency]);
}
