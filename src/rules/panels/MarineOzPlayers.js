import PropTypes from 'prop-types';
import {
  Button,
  Div,
  Group,
  Panel,
  PanelHeader,
  Placeholder,
  Spinner,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useMarineOzPlayersData } from '../../hooks/useMarineOzPlayersData';
import { OzPlayersRankTable } from '../components/OzPlayersRankTable';
import { MARINE_OZ_PLAYERS_LABEL } from './marineRules.data';
import './RulesApp.css';

export const MarineOzPlayers = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { players, loading, error, reload } = useMarineOzPlayersData();

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>{MARINE_OZ_PLAYERS_LABEL}</PanelHeader>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/marine' })}
          className="back-button"
        >
          Назад
        </Button>
        <Group>
          {loading && (
            <Div>
              <Spinner size="m" />
            </Div>
          )}
          {!loading && error && (
            <Placeholder
              header="Не удалось загрузить таблицу"
              action={(
                <Button size="m" mode="secondary" onClick={reload}>
                  Повторить
                </Button>
              )}
            >
              {error}
            </Placeholder>
          )}
          {!loading && !error && players.length === 0 && (
            <Placeholder header="Таблица пуста" />
          )}
          {!loading && !error && players.length > 0 && (
            <Div>
              <OzPlayersRankTable players={players} />
            </Div>
          )}
        </Group>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/marine' })}
          className="back-button"
        >
          Назад
        </Button>
      </div>
    </Panel>
  );
};

MarineOzPlayers.propTypes = {
  id: PropTypes.string.isRequired,
};
