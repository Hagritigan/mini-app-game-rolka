import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';
import { MarineRulesBody } from './MarineRulesBody';

export const Marine = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <div className="rules-panel">
      <PanelHeader>Морской Дозор</PanelHeader>
      <Button size="m" onClick={() => routeNavigator.back()} className="back-button">
        Назад
      </Button>
      <Group>
        <Div>
          <MarineRulesBody routeNavigator={routeNavigator} />
        </Div>
      </Group>
      <Button size="m" onClick={() => routeNavigator.back()} className="back-button">
        Назад
      </Button>
    </div>

    </Panel>
  );
};

Marine.propTypes = {
  id: PropTypes.string.isRequired,
};
