import { mainLocations } from '../data/mainLocations';

function addIsland(islands, seen, island, context) {
  if (!island?.title) {
    return;
  }

  if (island.modal && island.childrens?.length) {
    island.childrens.forEach((child) => {
      addIsland(islands, seen, child, {
        ...context,
        parentTitle: island.title,
      });
    });
    return;
  }

  if (!island.link) {
    return;
  }

  const id = island.link;

  if (seen.has(id)) {
    return;
  }

  seen.add(id);

  islands.push({
    id,
    title: island.title,
    link: island.link,
    region: context.region,
    way: context.way?.trim() ?? '',
    parentTitle: context.parentTitle ?? '',
  });
}

export function collectNavigationIslands(locations = mainLocations) {
  const islands = [];
  const seen = new Set();

  locations.forEach((location) => {
    location.ways?.forEach((way) => {
      way.islands?.forEach((island) => {
        addIsland(islands, seen, island, {
          region: location.title,
          way: way.title,
        });
      });
    });
  });

  return islands.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
}

export function filterNavigationIslands(islands, query, limit = 50) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return islands.slice(0, limit);
  }

  return islands
    .filter((island) => {
      const haystack = [
        island.title,
        island.region,
        island.way,
        island.parentTitle,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .slice(0, limit);
}

export function findNavigationIslandByTitle(islands, title) {
  const normalizedTitle = title.trim().toLowerCase();

  if (!normalizedTitle) {
    return null;
  }

  return islands.find((island) => island.title.toLowerCase() === normalizedTitle) ?? null;
}

export function getNavigationIslandSubtitle(island) {
  if (island.parentTitle) {
    return island.parentTitle;
  }

  const parts = [island.way, island.region].filter(Boolean);

  return parts.join(' · ');
}
