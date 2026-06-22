import {
  Icon28CupOutline,
  Icon28HomeOutline,
  Icon28LocationMapOutline,
  Icon28StarsOutline,
} from '@vkontakte/icons';
import { Icon28SwordOutline } from '../icons/Icon28SwordOutline';

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
    id: 'inventory',
    title: 'Снаряжение',
    subtitle: 'Предметы и снаряжение',
    accent: '#f5a623',
    accentDark: '#d48912',
    Icon: Icon28SwordOutline,
  },
  {
    id: 'navigation',
    title: 'Навигация',
    subtitle: 'Карта мира и локации',
    accent: '#4dc2d3',
    accentDark: '#217f86',
    Icon: Icon28LocationMapOutline,
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
