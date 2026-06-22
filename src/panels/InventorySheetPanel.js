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
import { EquipmentCard } from '../components/EquipmentCard';
import { SheetList } from '../components/SheetList';
import { INVENTORY_SPREADSHEET_ID } from '../config/googleSheets';
import { useInventorySheet } from '../hooks/useInventorySheet';
import { useSpreadsheetSheets } from '../hooks/useSpreadsheetSheets';
import './AchievementsSheetPanel.css';

function formatCount(count) {
  if (count === 1) {
    return '1 предмет';
  }
  if (count > 1 && count < 5) {
    return `${count} предмета`;
  }
  return `${count} предметов`;
}

export const InventorySheetPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams();
  const sheetGid = params?.sheetGid;

  const {
    loading: sheetsLoading,
    error: sheetsError,
    reload: reloadSheets,
    getSheetByGid,
    getChildSheets,
  } = useSpreadsheetSheets(INVENTORY_SPREADSHEET_ID);

  const currentSheet = getSheetByGid(sheetGid);
  const isGroup = Boolean(currentSheet?.childGids?.length);
  const childSheets = isGroup ? getChildSheets(currentSheet.childGids) : [];

  const sheetTitle = currentSheet?.title ?? (sheetsLoading ? 'Загрузка…' : 'Снаряжение');

  const { items, loading, error, reload } = useInventorySheet(isGroup ? null : sheetGid);

  const openSheet = (gid) => {
    routeNavigator.push(`/inventory/${gid}`);
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
          <SheetList sheets={childSheets} onSelect={openSheet} hint="Выберите раздел" />
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

      {!sheetsLoading && !sheetsError && !isGroup && !loading && !error && items.length === 0 ? (
        <Placeholder header="Пока пусто">На этом листе нет предметов.</Placeholder>
      ) : null}

      {!sheetsLoading && !sheetsError && !isGroup && !loading && !error && items.length > 0 ? (
        <>
          <div className="achievements-sheet-panel__count">{formatCount(items.length)}</div>
          <Group className="achievements-sheet-panel__list">
            {items.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </Group>
        </>
      ) : null}
    </Panel>
  );
};

InventorySheetPanel.propTypes = {
  id: PropTypes.string.isRequired,
};
