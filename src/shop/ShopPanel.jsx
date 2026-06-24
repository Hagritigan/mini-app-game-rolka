import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Div,
  Group,
  ModalCard,
  ModalRoot,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Spinner,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useShopData } from '../hooks/useShopData';
import { filterShopItems, groupShopItemsByCategory } from '../utils/parseShopSheet';
import { ShopOrderForm, ShopProductCard } from './components';
import './ShopPanel.css';

function formatCount(count) {
  if (count === 1) {
    return '1 лот';
  }
  if (count > 1 && count < 5) {
    return `${count} лота`;
  }
  return `${count} лотов`;
}

export const ShopPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { items, loading, error, reload } = useShopData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredItems = useMemo(
    () => filterShopItems(items, searchQuery),
    [items, searchQuery],
  );

  const groups = useMemo(
    () => groupShopItemsByCategory(filteredItems),
    [filteredItems],
  );

  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveModal('product-modal');
  };

  const closeProductModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Магазин
      </PanelHeader>

      <div className="shop-panel">
        <Div className="shop-panel__search-wrap">
          <input
            className="shop-panel__search"
            type="search"
            placeholder="Поиск по названию, описанию, цене..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </Div>

        {loading ? (
          <div className="shop-panel__state">
            <Spinner size="l" />
          </div>
        ) : null}

        {!loading && error ? (
          <Placeholder
            header="Не удалось загрузить"
            action={(
              <Button size="m" mode="primary" onClick={reload}>
                Повторить
              </Button>
            )}
          >
            {error}
          </Placeholder>
        ) : null}

        {!loading && !error && filteredItems.length === 0 ? (
          <Placeholder header={searchQuery ? 'Ничего не найдено' : 'Магазин пуст'}>
            {searchQuery
              ? 'Попробуйте изменить запрос.'
              : 'В таблице пока нет товаров.'}
          </Placeholder>
        ) : null}

        {!loading && !error && filteredItems.length > 0 ? (
          <>
            <div className="shop-panel__count">{formatCount(filteredItems.length)}</div>
            {groups.map((group) => (
              <Group
                key={group.category}
                header={groups.length > 1 ? group.category : undefined}
                className="shop-panel__group"
              >
                <div className="shop-panel__list">
                  {group.items.map((item) => (
                    <ShopProductCard key={item.id} item={item} onOpen={openProduct} />
                  ))}
                </div>
              </Group>
            ))}
          </>
        ) : null}
      </div>

      <ModalRoot activeModal={activeModal} onClose={closeProductModal}>
        <ModalCard
          id="product-modal"
          header={selectedProduct?.name}
          onClose={closeProductModal}
        >
          {selectedProduct ? (
            <div className="shop-product-modal">
              {selectedProduct.lot ? (
                <div className="shop-product-modal__meta">
                  <span className="shop-product-modal__lot">Лот {selectedProduct.lot}</span>
                  {selectedProduct.category ? (
                    <span className="shop-product-modal__category">{selectedProduct.category}</span>
                  ) : null}
                </div>
              ) : null}
              <div className="shop-product-modal__price">{selectedProduct.price}</div>
              {selectedProduct.description ? (
                <p className="shop-product-modal__description">{selectedProduct.description}</p>
              ) : (
                <p className="shop-product-modal__description shop-product-modal__description--empty">
                  Описание не указано.
                </p>
              )}
              <ShopOrderForm key={selectedProduct.id} product={selectedProduct} />
            </div>
          ) : null}
        </ModalCard>
      </ModalRoot>
    </Panel>
  );
};

ShopPanel.propTypes = {
  id: PropTypes.string.isRequired,
};
