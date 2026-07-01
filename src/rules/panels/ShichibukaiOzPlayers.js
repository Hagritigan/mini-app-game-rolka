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
import { useShichibukaiOzPlayersData } from '../../hooks/useShichibukaiOzPlayersData';
import { OzPlayersRankTable } from '../components/OzPlayersRankTable';
import { SHICHIBUKAI_OZ_PLAYERS_LABEL } from './constants';
import './RulesApp.css';

export const ShichibukaiOzPlayers = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { players, hasRankColumn, scoreColumnLabel, loading, error, reload } = useShichibukaiOzPlayersData();

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>{SHICHIBUKAI_OZ_PLAYERS_LABEL}</PanelHeader>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/pirates' })}
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
              <OzPlayersRankTable
                players={players}
                showRank={hasRankColumn}
                scoreColumnLabel={scoreColumnLabel}
              />
            </Div>
          )}
        </Group>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/pirates' })}
          className="back-button"
        >
          Назад
        </Button>
      </div>
    </Panel>
  );
};

ShichibukaiOzPlayers.propTypes = {
  id: PropTypes.string.isRequired,
};
