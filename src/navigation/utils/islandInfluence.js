import { DEFAULT_INFLUENCE_COLORS } from '../../utils/parseNavigationSheet';

export const INFLUENCE_COLORS = DEFAULT_INFLUENCE_COLORS;

function resolveInfluenceColor(influence) {
  return influence.color
    ?? INFLUENCE_COLORS[influence.id]
    ?? '#8593ce';
}

export function getInfluences(meta) {
  if (Array.isArray(meta?.influences) && meta.influences.length > 0) {
    return meta.influences
      .filter((influence) => influence?.text)
      .map((influence) => ({
        ...influence,
        color: resolveInfluenceColor(influence),
      }));
  }

  const influences = [];

  if (meta?.hasDozor) {
    influences.push({
      id: 'dozor',
      label: 'Дозор',
      text: meta.dozor,
      color: meta.dozorColor ?? INFLUENCE_COLORS.dozor,
    });
  }

  if (meta?.hasPp) {
    influences.push({
      id: 'pp',
      label: 'ПП',
      text: meta.pp,
      color: meta.ppColor ?? INFLUENCE_COLORS.pp,
    });
  }

  return influences;
}

export function getInfluenceCount(meta) {
  return getInfluences(meta).length;
}

/** @deprecated используйте getInfluenceCount и getInfluences */
export function getInfluenceKind(meta) {
  const count = getInfluenceCount(meta);

  if (count === 0) {
    return 'none';
  }

  const influences = getInfluences(meta);

  if (count === 1) {
    return influences[0].id;
  }

  if (count === 2 && influences.some((influence) => influence.id === 'dozor') && influences.some((influence) => influence.id === 'pp')) {
    return 'both';
  }

  return 'multi';
}

export function buildInfluenceBorderGradient(influences) {
  if (influences.length < 2) {
    return null;
  }

  const step = 100 / influences.length;

  const stops = influences.flatMap((influence, index) => {
    const start = (index * step).toFixed(4);
    const end = ((index + 1) * step).toFixed(4);
    const color = resolveInfluenceColor(influence);

    return [`${color} ${start}%`, `${color} ${end}%`];
  });

  return `linear-gradient(to right, ${stops.join(', ')})`;
}

export function getInfluenceStyle(meta) {
  const influences = getInfluences(meta);
  const style = {};

  influences.forEach((influence, index) => {
    style[`--influence-${index + 1}`] = influence.color;

    if (influence.id === 'dozor') {
      style['--influence-dozor'] = influence.color;
    }

    if (influence.id === 'pp') {
      style['--influence-pp'] = influence.color;
    }
  });

  const gradient = buildInfluenceBorderGradient(influences);

  if (gradient) {
    style['--influence-border-gradient'] = gradient;
  }

  return style;
}

export function getInfluenceLegendItems(data) {
  const columns = data?.influenceColumns ?? data?.colors?.influenceColumns ?? [];
  const columnColors = data?.colors?.columnColors ?? {};

  return columns.map((column) => ({
    id: column.id,
    label: column.label,
    color: columnColors[column.column]
      ?? data?.colors?.palette?.[column.id]
      ?? INFLUENCE_COLORS[column.id]
      ?? '#8593ce',
  }));
}
