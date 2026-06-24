import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack, Header, Button, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { rulesPath } from '../paths';
import { RULES_SECTIONS } from './rulesSections';
import './RulesApp.css';

export const RulesHomePanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Правила
      </PanelHeader>
      <div className="rules-panel">
        <Group className="main_wrrapper" header={<Header mode="secondary">Список разделов</Header>}>
          <Div className="some">
            {RULES_SECTIONS.map((rule) => (
              <Button
                className="button"
                stretched
                size="l"
                mode="secondary"
                onClick={() => routeNavigator.push(rulesPath(rule.link))}
                key={rule.link}
              >
                {rule.title}
              </Button>
            ))}
          </Div>
        </Group>
      </div>
    </Panel>
  );
};

RulesHomePanel.propTypes = {
  id: PropTypes.string.isRequired,
};
