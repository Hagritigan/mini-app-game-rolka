import { useState } from 'react';
import PropTypes from 'prop-types';
import { getSheetImageUrl } from '../../utils/getSheetImageUrl';
import './SheetList.css';

function SheetCard({ sheet, onSelect }) {
  const [hasError, setHasError] = useState(false);

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
        <img
          src={getSheetImageUrl(sheet.gid)}
          alt={sheet.title}
          className="sheet-card__image"
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
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

export function SheetList({ sheets, onSelect, hint }) {
  return (
    <div className="sheet-list">
      {hint ? <p className="sheet-list__hint">{hint}</p> : null}
      <div className="sheet-list__grid">
        {sheets.map((sheet) => (
          <SheetCard key={sheet.gid} sheet={sheet} onSelect={onSelect} />
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
};
