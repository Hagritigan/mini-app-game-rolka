import PropTypes from 'prop-types';
import { useIsMobileViewport } from '../../hooks/useIsMobileViewport';
import './MetaBadge.css';

export function MetaBadge({ kind, label, text, islandTitle, onOpenMeta }) {
  const isMobile = useIsMobileViewport();
  const modalTitle = kind === 'dozor' ? 'Дозор' : 'ПП';

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isMobile) {
      return;
    }

    onOpenMeta?.({
      title: `${modalTitle} — ${islandTitle}`,
      text,
    });
  };

  return (
    <span className={`meta-badge meta-badge--${kind}`}>
      <button
        type="button"
        className={`island-card__badge island-card__badge--${kind}`}
        aria-label={`${label}: ${islandTitle}`}
        onClick={handleClick}
      >
        {label}
      </button>
      {!isMobile ? (
        <span className="meta-badge__tooltip" role="tooltip">
          {text}
        </span>
      ) : null}
    </span>
  );
}

MetaBadge.propTypes = {
  kind: PropTypes.oneOf(['dozor', 'pp']).isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  islandTitle: PropTypes.string.isRequired,
  onOpenMeta: PropTypes.func,
};
