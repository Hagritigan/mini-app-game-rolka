import {
  Button,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Spinner,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { AchievementCard } from '../components/AchievementCard';
import { SheetList } from '../components/SheetList';
import { useAchievementsSheet } from '../hooks/useAchievementsSheet';
import { useEqualCardFooters } from '../hooks/useEqualCardFooters';
import { useSpreadsheetSheets } from '../hooks/useSpreadsheetSheets';
import './AchievementsSheetPanel.css';

function formatCount(count) {
  if (count === 1) {
    return '1 достижение';
  }
  if (count > 1 && count < 5) {
    return `${count} достижения`;
  }
  return `${count} достижений`;
}

export const AchievementsSheetPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams();
  const sheetGid = params?.sheetGid;

  const {
    loading: sheetsLoading,
    error: sheetsError,
    reload: reloadSheets,
    getSheetByGid,
    getChildSheets,
  } = useSpreadsheetSheets();

  const currentSheet = getSheetByGid(sheetGid);
  const isGroup = Boolean(currentSheet?.childGids?.length);
  const childSheets = isGroup ? getChildSheets(currentSheet.childGids) : [];

  const sheetTitle =
    currentSheet?.title ?? (sheetsLoading ? 'Загрузка…' : 'Достижения');

  const { achievements, loading, error, reload } = useAchievementsSheet(
    isGroup ? null : sheetGid,
  );
  const listRef = useRef(null);

  useEqualCardFooters(listRef, achievements);

  const openSheet = (gid) => {
    routeNavigator.push(`/achievements/${gid}`);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        {sheetTitle}
      </PanelHeader>

      {sheetsLoading ? (
        <div className="achievements-sheet-panel__state">
          <Spinner size="l" />
        </div>
      ) : null}

      {!sheetsLoading && sheetsError ? (
        <Placeholder
          header="Не удалось загрузить"
          action={
            <Button size="m" mode="primary" onClick={reloadSheets}>
              Повторить
            </Button>
          }
        >
          {sheetsError}
        </Placeholder>
      ) : null}

      {!sheetsLoading && !sheetsError && isGroup ? (
        childSheets.length > 0 ? (
          <SheetList
            sheets={childSheets}
            onSelect={openSheet}
            hint="Выберите раздел"
          />
        ) : (
          <Placeholder header="Список пуст">
            В ячейке A1 указаны листы, но они не найдены в таблице.
          </Placeholder>
        )
      ) : null}

      {!sheetsLoading && !sheetsError && !isGroup && loading ? (
        <div className="achievements-sheet-panel__state">
          <Spinner size="l" />
        </div>
      ) : null}

      {!sheetsLoading && !sheetsError && !isGroup && !loading && error ? (
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

      {!sheetsLoading && !sheetsError && !isGroup && !loading && !error && achievements.length === 0 ? (
        <Placeholder header="Пока пусто">На этом листе нет достижений.</Placeholder>
      ) : null}

      {!sheetsLoading && !sheetsError && !isGroup && !loading && !error && achievements.length > 0 ? (
        <>
          <div className="achievements-sheet-panel__count">{formatCount(achievements.length)}</div>
          <Group>
            <div className="achievements-sheet-panel__list" ref={listRef}>
              {achievements.map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
            </div>
          </Group>
        </>
      ) : null}
    </Panel>
  );
};

AchievementsSheetPanel.propTypes = {
  id: PropTypes.string.isRequired,
};
