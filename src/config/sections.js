import {
  Icon28CupOutline,
  Icon28DiamondOutline,
  Icon28HomeOutline,
  Icon28StarsOutline,
} from '@vkontakte/icons';

export const SECTIONS = [
  {
    id: 'achievements',
    title: 'Достижения',
    subtitle: 'Награды и прогресс',
    accent: '#f5b800',
    accentDark: '#c99700',
    Icon: Icon28StarsOutline,
  },
  {
    id: 'east',
    title: 'Сокровища',
    subtitle: 'Награды и коллекция',
    accent: '#f5a623',
    accentDark: '#d48912',
    Icon: Icon28DiamondOutline,
  },
  {
    id: 'south',
    title: 'Арена',
    subtitle: 'Сражения и рейтинг',
    accent: '#f25555',
    accentDark: '#c93a3a',
    Icon: Icon28CupOutline,
  },
  {
    id: 'west',
    title: 'Лагерь',
    subtitle: 'Отдых между походами',
    accent: '#a855f7',
    accentDark: '#7c3aed',
    Icon: Icon28HomeOutline,
  },
];
