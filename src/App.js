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
import {
  RulesShell,
  RulesHomePanel,
  Registration,
  Game,
  Revards,
  Ld,
  Abilities,
  Cyborgs,
  Df,
  Haki,
  Seimei,
  Iosory,
  Restrictions,
  Pirates,
  Ra,
  Marine,
  MarineIslandControl,
  Cp,
  Equipment,
  Races,
  Fishmankarate,
  Mermaidstyle,
  Powertablet,
  Rebild,
  Canon,
  Requiem,
  RequiemQuests,
  RequiemShop,
  RequiemWallet,
  Bosses,
} from './rules';
import { NavigationPanel } from './navigation';
import { ShopPanel } from './shop';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  return (
    <RulesShell>
      {(rulesModal) => (
        <SplitLayout modal={rulesModal}>
          <SplitCol>
            <View activePanel={activePanel}>
              <Home id={DEFAULT_VIEW_PANELS.HOME} />
              <AchievementsPanel id={DEFAULT_VIEW_PANELS.ACHIEVEMENTS} />
              <AchievementsSheetPanel id={DEFAULT_VIEW_PANELS.ACHIEVEMENTS_SHEET} />
              <InventoryPanel id={DEFAULT_VIEW_PANELS.INVENTORY} />
              <InventorySheetPanel id={DEFAULT_VIEW_PANELS.INVENTORY_SHEET} />
              <ShopPanel id={DEFAULT_VIEW_PANELS.SHOP} />
              <NavigationPanel id={DEFAULT_VIEW_PANELS.NAVIGATION} />
              <RulesHomePanel id={DEFAULT_VIEW_PANELS.RULES} />
              <Registration id={DEFAULT_VIEW_PANELS.RULES_REGISTRATION} />
              <Game id={DEFAULT_VIEW_PANELS.RULES_GAME} />
              <Revards id={DEFAULT_VIEW_PANELS.RULES_REVARDS} />
              <Ld id={DEFAULT_VIEW_PANELS.RULES_LD} />
              <Abilities id={DEFAULT_VIEW_PANELS.RULES_ABILITIES} />
              <Cyborgs id={DEFAULT_VIEW_PANELS.RULES_CYBORGS} />
              <Df id={DEFAULT_VIEW_PANELS.RULES_DF} />
              <Haki id={DEFAULT_VIEW_PANELS.RULES_HAKI} />
              <Seimei id={DEFAULT_VIEW_PANELS.RULES_SEIMEI} />
              <Iosory id={DEFAULT_VIEW_PANELS.RULES_IOSORY} />
              <Restrictions id={DEFAULT_VIEW_PANELS.RULES_RESTRICTIONS} />
              <Pirates id={DEFAULT_VIEW_PANELS.RULES_PIRATES} />
              <Ra id={DEFAULT_VIEW_PANELS.RULES_RA} />
              <Marine id={DEFAULT_VIEW_PANELS.RULES_MARINE} />
              <MarineIslandControl id={DEFAULT_VIEW_PANELS.RULES_MARINE_ISLAND_CONTROL} />
              <Cp id={DEFAULT_VIEW_PANELS.RULES_CP} />
              <Equipment id={DEFAULT_VIEW_PANELS.RULES_EQUIPMENT} />
              <Races id={DEFAULT_VIEW_PANELS.RULES_RACES} />
              <Fishmankarate id={DEFAULT_VIEW_PANELS.RULES_FISHMANKARATE} />
              <Mermaidstyle id={DEFAULT_VIEW_PANELS.RULES_MERMAIDSTYLE} />
              <Powertablet id={DEFAULT_VIEW_PANELS.RULES_POWERTABLET} />
              <Rebild id={DEFAULT_VIEW_PANELS.RULES_REBILD} />
              <Canon id={DEFAULT_VIEW_PANELS.RULES_CANON} />
              <Requiem id={DEFAULT_VIEW_PANELS.RULES_REQUIEM} />
              <RequiemQuests id={DEFAULT_VIEW_PANELS.RULES_REQUIEMQUESTS} />
              <RequiemShop id={DEFAULT_VIEW_PANELS.RULES_REQUIEMSHOP} />
              <RequiemWallet id={DEFAULT_VIEW_PANELS.RULES_REQUIEMWALLET} />
              <Bosses id={DEFAULT_VIEW_PANELS.RULES_BOSSES} />
              <Section id={DEFAULT_VIEW_PANELS.SOUTH} />
              <Section id={DEFAULT_VIEW_PANELS.WEST} />
            </View>
          </SplitCol>
        </SplitLayout>
      )}
    </RulesShell>
  );
};
