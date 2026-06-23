import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getSheetImageUrl,
  SHEET_IMAGE_PLACEHOLDER_URL,
} from '../../utils/getSheetImageUrl';
import './SheetList.css';

function SimpleSheetCard({ sheet, onSelect }) {
  return (
    <button
      type="button"
      className="sheet-card sheet-card--simple"
      aria-label={sheet.title}
      onClick={() => onSelect(sheet.gid)}
    >
      <span className="sheet-card__simple-title">{sheet.title}</span>
      <span className="sheet-card__simple-chevron" aria-hidden />
    </button>
  );
}

SimpleSheetCard.propTypes = {
  sheet: PropTypes.shape({
    gid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

function SheetCard({ sheet, onSelect }) {
  const [imageSrc, setImageSrc] = useState(() => getSheetImageUrl(sheet.gid));
  const [hasError, setHasError] = useState(false);

  const isPlaceholder = imageSrc === SHEET_IMAGE_PLACEHOLDER_URL;

  const handleImageError = () => {
    if (imageSrc !== SHEET_IMAGE_PLACEHOLDER_URL) {
      setImageSrc(SHEET_IMAGE_PLACEHOLDER_URL);
      return;
    }
    setHasError(true);
  };

  return (
    <button
      type="button"
      className="sheet-card"
      aria-label={sheet.title}
      onClick={() => onSelect(sheet.gid)}
    >
      {hasError ? (
        <span className="sheet-card__fallback">{sheet.title}</span>
      ) : (
        <div
          className={
            isPlaceholder
              ? 'sheet-card__media sheet-card__media--placeholder'
              : 'sheet-card__media'
          }
        >
          <img
            src={imageSrc}
            alt={sheet.title}
            className="sheet-card__image"
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
          {isPlaceholder ? (
            <div className="sheet-card__title-bar" aria-hidden="true">
              <span className="sheet-card__title">{sheet.title}</span>
            </div>
          ) : null}
        </div>
      )}
    </button>
  );
}

SheetCard.propTypes = {
  sheet: PropTypes.shape({
    gid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export function SheetList({ sheets, onSelect, hint, variant = 'image' }) {
  const Card = variant === 'simple' ? SimpleSheetCard : SheetCard;

  return (
    <div className={`sheet-list${variant === 'simple' ? ' sheet-list--simple' : ''}`}>
      {hint ? <p className="sheet-list__hint">{hint}</p> : null}
      <div className="sheet-list__grid">
        {sheets.map((sheet) => (
          <Card key={sheet.gid} sheet={sheet} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

SheetList.propTypes = {
  sheets: PropTypes.arrayOf(
    PropTypes.shape({
      gid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  hint: PropTypes.string,
  variant: PropTypes.oneOf(['image', 'simple']),
};
