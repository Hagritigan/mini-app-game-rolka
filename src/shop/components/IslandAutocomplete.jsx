import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  collectNavigationIslands,
  filterNavigationIslands,
  findNavigationIslandByTitle,
  getNavigationIslandSubtitle,
} from '../../navigation/utils/collectNavigationIslands';
import './CharacterAutocomplete.css';

const navigationIslands = collectNavigationIslands();

export function IslandAutocomplete({
  value,
  selectedIsland,
  onChange,
  onSelect,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);

  const suggestions = useMemo(
    () => filterNavigationIslands(navigationIslands, value),
    [value],
  );

  const hasError = Boolean(value.trim() && !selectedIsland);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const selectIsland = (island) => {
    onSelect(island);
    onChange(island.title);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    onChange(nextValue);

    const exactMatch = findNavigationIslandByTitle(navigationIslands, nextValue);

    if (exactMatch) {
      onSelect(exactMatch);
    } else if (selectedIsland && selectedIsland.title !== nextValue.trim()) {
      onSelect(null);
    }

    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectIsland(suggestions[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showSuggestions = isOpen && !disabled;

  return (
    <div className="character-autocomplete" ref={rootRef}>
      <label className="character-autocomplete__label" htmlFor="shop-island-input">
        Остров
      </label>

      <div className="character-autocomplete__field">
        <input
          id="shop-island-input"
          className={`character-autocomplete__input${hasError ? ' character-autocomplete__input--error' : ''}`}
          type="text"
          value={value}
          placeholder="Начните вводить название острова"
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />

        {showSuggestions && suggestions.length > 0 ? (
          <ul className="character-autocomplete__list" role="listbox">
            {suggestions.map((island, index) => {
              const subtitle = getNavigationIslandSubtitle(island);

              return (
                <li key={island.id} className="character-autocomplete__item">
                  <button
                    type="button"
                    className={`character-autocomplete__option${index === activeIndex ? ' character-autocomplete__option--active' : ''}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectIsland(island)}
                  >
                    <span className="character-autocomplete__option-name">{island.title}</span>
                    {subtitle ? (
                      <span className="character-autocomplete__option-player">{subtitle}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        {showSuggestions && value.trim() && suggestions.length === 0 ? (
          <div className="character-autocomplete__empty">Остров не найден</div>
        ) : null}
      </div>

      {hasError ? (
        <div className="character-autocomplete__error">Выберите остров из списка</div>
      ) : null}

      {selectedIsland ? (
        <div className="character-autocomplete__selected">
          {getNavigationIslandSubtitle(selectedIsland) || 'Локация из навигации'}
        </div>
      ) : null}
    </div>
  );
}

IslandAutocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  selectedIsland: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    region: PropTypes.string,
    way: PropTypes.string,
    parentTitle: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
