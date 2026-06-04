import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import {
  AchievementsPanel,
  AchievementsSheetPanel,
  Home,
  InventoryPanel,
  InventorySheetPanel,
  Section,
} from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} />
          <AchievementsPanel id={DEFAULT_VIEW_PANELS.ACHIEVEMENTS} />
          <AchievementsSheetPanel id={DEFAULT_VIEW_PANELS.ACHIEVEMENTS_SHEET} />
          <InventoryPanel id={DEFAULT_VIEW_PANELS.INVENTORY} />
          <InventorySheetPanel id={DEFAULT_VIEW_PANELS.INVENTORY_SHEET} />
          <Section id={DEFAULT_VIEW_PANELS.SOUTH} />
          <Section id={DEFAULT_VIEW_PANELS.WEST} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
