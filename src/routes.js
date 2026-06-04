import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  ACHIEVEMENTS: 'achievements',
  ACHIEVEMENTS_SHEET: 'achievements_sheet',
  INVENTORY: 'inventory',
  INVENTORY_SHEET: 'inventory_sheet',
  SOUTH: 'south',
  WEST: 'west',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.ACHIEVEMENTS, `/${DEFAULT_VIEW_PANELS.ACHIEVEMENTS}`, []),
      createPanel(
        DEFAULT_VIEW_PANELS.ACHIEVEMENTS_SHEET,
        `/${DEFAULT_VIEW_PANELS.ACHIEVEMENTS}/:sheetGid`,
        [],
        ['sheetGid'],
      ),
      createPanel(DEFAULT_VIEW_PANELS.INVENTORY, `/${DEFAULT_VIEW_PANELS.INVENTORY}`, []),
      createPanel(
        DEFAULT_VIEW_PANELS.INVENTORY_SHEET,
        `/${DEFAULT_VIEW_PANELS.INVENTORY}/:sheetGid`,
        [],
        ['sheetGid'],
      ),
      createPanel(DEFAULT_VIEW_PANELS.SOUTH, `/${DEFAULT_VIEW_PANELS.SOUTH}`, []),
      createPanel(DEFAULT_VIEW_PANELS.WEST, `/${DEFAULT_VIEW_PANELS.WEST}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
