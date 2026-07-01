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
import { useCpOzPlayersData } from '../../hooks/useCpOzPlayersData';
import { OzPlayersRankTable } from '../components/OzPlayersRankTable';
import { CP_OZ_PLAYERS_LABEL } from './constants';
import './RulesApp.css';

export const CpOzPlayers = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { players, loading, error, reload } = useCpOzPlayersData();

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>{CP_OZ_PLAYERS_LABEL}</PanelHeader>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/cp' })}
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
          onClick={() => routeNavigator.push({ pathname: '/rules/cp' })}
          className="back-button"
        >
          Назад
        </Button>
      </div>
    </Panel>
  );
};

CpOzPlayers.propTypes = {
  id: PropTypes.string.isRequired,
};
