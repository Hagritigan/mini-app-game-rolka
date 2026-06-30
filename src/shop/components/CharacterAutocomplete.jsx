import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useCharactersData } from '../../hooks/useCharactersData';
import { filterCharacters, findCharacterByName } from '../../utils/parseCharactersSheet';
import './CharacterAutocomplete.css';

export function CharacterAutocomplete({
  value,
  selectedCharacter,
  onChange,
  onSelect,
  disabled = false,
}) {
  const { characters, loading, error } = useCharactersData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);

  const suggestions = useMemo(
    () => filterCharacters(characters, value),
    [characters, value],
  );

  const hasError = Boolean(value.trim() && !selectedCharacter);

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

  const selectCharacter = (character) => {
    onSelect(character);
    onChange(character.characterName);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    onChange(nextValue);

    const exactMatch = findCharacterByName(characters, nextValue);

    if (exactMatch) {
      onSelect(exactMatch);
    } else if (selectedCharacter && selectedCharacter.characterName !== nextValue.trim()) {
      onSelect(null);
    }

    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleFocus = () => {
    if (value.trim()) {
      setIsOpen(true);
    }
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
      selectCharacter(suggestions[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showSuggestions = isOpen && value.trim() && !loading && !error;

  return (
    <div className="character-autocomplete" ref={rootRef}>
      <label className="character-autocomplete__label" htmlFor="shop-character-input">
        Персонаж
      </label>

      <div className="character-autocomplete__field">
        <input
          id="shop-character-input"
          className={`character-autocomplete__input${hasError ? ' character-autocomplete__input--error' : ''}`}
          type="text"
          value={value}
          placeholder="Начните вводить имя персонажа"
          disabled={disabled || loading}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />

        {showSuggestions && suggestions.length > 0 ? (
          <ul className="character-autocomplete__list" role="listbox">
            {suggestions.map((character, index) => (
              <li key={character.id} className="character-autocomplete__item">
                <button
                  type="button"
                  className={`character-autocomplete__option${index === activeIndex ? ' character-autocomplete__option--active' : ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectCharacter(character)}
                >
                  <span className="character-autocomplete__option-name">{character.characterName}</span>
                  {character.playerName ? (
                    <span className="character-autocomplete__option-player">{character.playerName}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {showSuggestions && suggestions.length === 0 ? (
          <div className="character-autocomplete__empty">Персонаж не найден</div>
        ) : null}
      </div>

      {hasError ? (
        <div className="character-autocomplete__error">Выберите персонажа из списка</div>
      ) : null}

      {loading ? (
        <div className="character-autocomplete__hint">Загрузка списка персонажей…</div>
      ) : null}

      {!loading && error ? (
        <div className="character-autocomplete__hint character-autocomplete__hint--error">
          Не удалось загрузить персонажей
        </div>
      ) : null}

      {selectedCharacter ? (
        <div className="character-autocomplete__selected">
          Игрок: {selectedCharacter.playerName || 'не указан'}
        </div>
      ) : null}
    </div>
  );
}

CharacterAutocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  selectedCharacter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    playerName: PropTypes.string,
    characterName: PropTypes.string.isRequired,
    personalFileLink: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
