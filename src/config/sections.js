import {
  Icon28ArticleOutline,
  Icon28LocationMapOutline,
  Icon28MarketOutline,
  Icon28StarsOutline,
} from '@vkontakte/icons';
import { Icon28BackpackOutline } from '../icons/Icon28BackpackOutline';

export const SECTIONS = [
  {
    id: 'rules',
    title: 'Правила',
    subtitle: 'Правила ролевой',
    accent: '#6b8cce',
    accentDark: '#4a6bb5',
    Icon: Icon28ArticleOutline,
  },
  {
    id: 'navigation',
    title: 'Навигация',
    subtitle: 'Локации мира',
    accent: '#4dc2d3',
    accentDark: '#217f86',
    Icon: Icon28LocationMapOutline,
  },
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
    Icon: Icon28BackpackOutline,
  },
  // {
  //   id: 'shop',
  //   title: 'Магазин',
  //   subtitle: 'Лоты и цены',
  //   accent: '#3ecf8e',
  //   accentDark: '#1f9d63',
  //   Icon: Icon28MarketOutline,
  // },
];
