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
import { useRaNpcData } from '../../hooks/useRaNpcData';
import { useRaOzPlayersData } from '../../hooks/useRaOzPlayersData';
import { OzPlayersRankTable } from '../components/OzPlayersRankTable';
import { RaNpcTable } from '../components/RaNpcTable';
import { RA_MEMBERS_LABEL } from './constants';
import './RaMembers.css';
import './RulesApp.css';

export const RaMembers = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const {
    npcs,
    loading: npcsLoading,
    error: npcsError,
    reload: reloadNpcs,
  } = useRaNpcData();
  const {
    players,
    loading: playersLoading,
    error: playersError,
    reload: reloadPlayers,
  } = useRaOzPlayersData();

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>{RA_MEMBERS_LABEL}</PanelHeader>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/ra' })}
          className="back-button"
        >
          Назад
        </Button>
        <Group>
          <Div className="ra-members">
            <h2 className="ra-members__section-title">NPC</h2>
            {npcsLoading && (
              <Div>
                <Spinner size="m" />
              </Div>
            )}
            {!npcsLoading && npcsError && (
              <Placeholder
                header="Не удалось загрузить NPC"
                action={(
                  <Button size="m" mode="secondary" onClick={reloadNpcs}>
                    Повторить
                  </Button>
                )}
              >
                {npcsError}
              </Placeholder>
            )}
            {!npcsLoading && !npcsError && npcs.length === 0 && (
              <Placeholder header="Список NPC пуст" />
            )}
            {!npcsLoading && !npcsError && npcs.length > 0 && (
              <RaNpcTable npcs={npcs} />
            )}

            <h2 className="ra-members__section-title">Игроки</h2>
            {playersLoading && (
              <Div>
                <Spinner size="m" />
              </Div>
            )}
            {!playersLoading && playersError && (
              <Placeholder
                header="Не удалось загрузить игроков"
                action={(
                  <Button size="m" mode="secondary" onClick={reloadPlayers}>
                    Повторить
                  </Button>
                )}
              >
                {playersError}
              </Placeholder>
            )}
            {!playersLoading && !playersError && players.length === 0 && (
              <Placeholder header="Таблица игроков пуста" />
            )}
            {!playersLoading && !playersError && players.length > 0 && (
              <OzPlayersRankTable players={players} />
            )}
          </Div>
        </Group>
        <Button
          size="m"
          onClick={() => routeNavigator.push({ pathname: '/rules/ra' })}
          className="back-button"
        >
          Назад
        </Button>
      </div>
    </Panel>
  );
};

RaMembers.propTypes = {
  id: PropTypes.string.isRequired,
};
