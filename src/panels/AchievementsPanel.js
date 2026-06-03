import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Spinner,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { SheetList } from '../components/SheetList';
import { useSpreadsheetSheets } from '../hooks/useSpreadsheetSheets';

export const AchievementsPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { rootSheets, loading, error, reload } = useSpreadsheetSheets();

  const openSheet = (gid) => {
    routeNavigator.push(`/achievements/${gid}`);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Достижения
      </PanelHeader>

      {loading ? (
        <div className="achievements-panel__state">
          <Spinner size="l" />
        </div>
      ) : null}

      {!loading && error ? (
        <Placeholder
          header="Не удалось загрузить"
          action={
            <Button size="m" mode="primary" onClick={reload}>
              Повторить
            </Button>
          }
        >
          {error}
        </Placeholder>
      ) : null}

      {!loading && !error && rootSheets.length === 0 ? (
        <Placeholder header="Нет листов">В таблице не найдено ни одного листа.</Placeholder>
      ) : null}

      {!loading && !error && rootSheets.length > 0 ? (
        <SheetList
          sheets={rootSheets}
          onSelect={openSheet}
          hint="Выберите раздел"
        />
      ) : null}
    </Panel>
  );
};

AchievementsPanel.propTypes = {
  id: PropTypes.string.isRequired,
};
