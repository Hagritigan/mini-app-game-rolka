import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Switch } from '@vkontakte/vkui';
import { CharacterAutocomplete } from './CharacterAutocomplete';
import { IslandAutocomplete } from './IslandAutocomplete';
import { ShopQuantityField } from './ShopQuantityField';
import { useShopOrdersTopicMeta } from '../../hooks/useShopOrdersTopicMeta';
import { formatShopOrderText } from '../utils/formatShopOrderText';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { openExternalLink } from '../../utils/openExternalLink';
import './CharacterAutocomplete.css';
import './ShopProductForm.css';

function isValidLocationLink(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function ShopProductForm({ product }) {
  const { lastPageUrl } = useShopOrdersTopicMeta();
  const [quantity, setQuantity] = useState(1);
  const [characterQuery, setCharacterQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [islandQuery, setIslandQuery] = useState('');
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [customLocationLink, setCustomLocationLink] = useState('');
  const [discountNotes, setDiscountNotes] = useState('');
  const [copyStatus, setCopyStatus] = useState(null);

  const handleCustomLocationChange = (event) => {
    const checked = event.target.checked;
    setIsCustomLocation(checked);

    if (checked) {
      setIslandQuery('');
      setSelectedIsland(null);
      return;
    }

    setCustomLocationLink('');
  };

  const hasCustomLinkError = Boolean(
    isCustomLocation && customLocationLink.trim() && !isValidLocationLink(customLocationLink),
  );

  const hasLocation = isCustomLocation
    ? isValidLocationLink(customLocationLink)
    : Boolean(selectedIsland);

  const canCreateOrder = Boolean(selectedCharacter) && hasLocation;

  const handleCreateOrder = async () => {
    if (!canCreateOrder) {
      return;
    }

    const locationLink = isCustomLocation
      ? customLocationLink.trim()
      : selectedIsland?.link ?? '';

    const orderText = formatShopOrderText({
      lotName: product?.name ?? '',
      quantity,
      personalFileLink: selectedCharacter?.personalFileLink ?? '',
      locationLink,
      discountNotes,
    });

    try {
      await copyToClipboard(orderText);
      setCopyStatus('success');
      openExternalLink(lastPageUrl);
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <div className="shop-product-form">
      <ShopQuantityField value={quantity} onChange={setQuantity} />

      <CharacterAutocomplete
        value={characterQuery}
        selectedCharacter={selectedCharacter}
        onChange={setCharacterQuery}
        onSelect={setSelectedCharacter}
      />

      {!isCustomLocation ? (
        <IslandAutocomplete
          value={islandQuery}
          selectedIsland={selectedIsland}
          onChange={setIslandQuery}
          onSelect={setSelectedIsland}
        />
      ) : null}

      <div className="shop-product-form__toggle-row">
        <label className="shop-product-form__toggle-label" htmlFor="shop-custom-location-toggle">
          Локация не из навигации
        </label>
        <Switch
          id="shop-custom-location-toggle"
          checked={isCustomLocation}
          onChange={handleCustomLocationChange}
        />
      </div>

      {isCustomLocation ? (
        <div className="character-autocomplete">
          <label className="character-autocomplete__label" htmlFor="shop-custom-location-link">
            Ссылка на локацию
          </label>

          <input
            id="shop-custom-location-link"
            className={`character-autocomplete__input${hasCustomLinkError ? ' character-autocomplete__input--error' : ''}`}
            type="url"
            value={customLocationLink}
            placeholder="https://vk.com/topic-..."
            onChange={(event) => setCustomLocationLink(event.target.value)}
            autoComplete="off"
            spellCheck={false}
          />

          <div className="character-autocomplete__hint">
            Локация не из раздела навигации — укажите ссылку на тему или страницу ВКонтакте.
          </div>

          {hasCustomLinkError ? (
            <div className="character-autocomplete__error">Введите корректную ссылку</div>
          ) : null}
        </div>
      ) : null}

      <div className="shop-product-form__field">
        <label className="shop-product-form__label" htmlFor="shop-discount-notes">
          Купоны на скидку и тому подобное
        </label>
        <textarea
          id="shop-discount-notes"
          className="shop-product-form__textarea"
          value={discountNotes}
          rows={4}
          placeholder="Купоны, промокоды и другие бонусы"
          onChange={(event) => setDiscountNotes(event.target.value)}
          spellCheck={false}
        />
      </div>

      <Button
        className="shop-product-form__submit"
        size="l"
        mode="primary"
        stretched
        disabled={!canCreateOrder}
        onClick={handleCreateOrder}
      >
        Создать заявку
      </Button>

      {copyStatus === 'success' ? (
        <div className="shop-product-form__copy-status shop-product-form__copy-status--success">
          Заявка скопирована. Открыта последняя страница темы для вставки.
        </div>
      ) : null}

      {copyStatus === 'error' ? (
        <div className="shop-product-form__copy-status shop-product-form__copy-status--error">
          Не удалось скопировать заявку
        </div>
      ) : null}
    </div>
  );
}

ShopProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lot: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
