import PropTypes from 'prop-types';
import { useConfigProvider } from '@vkontakte/vkui';
import { SECTIONS } from '../../config/sections';
import './TileMenu.css';

export const TileMenu = ({ onNavigate }) => {
  const { colorScheme } = useConfigProvider();

  return (
    <div className="tile-menu" data-scheme={colorScheme || 'light'}>
      <p className="tile-menu__intro">Выберите раздел, чтобы продолжить путь.</p>
      <div className="tile-menu__grid">
        {SECTIONS.map(({ id, title, subtitle, accent, accentDark, Icon }, index) => (
          <button
            key={id}
            type="button"
            className={`tile-menu__tile${index === 0 ? ' tile-menu__tile--featured' : ''}`}
            style={{
              '--tile-accent': accent,
              '--tile-accent-dark': accentDark,
            }}
            aria-label={title}
            onClick={() => onNavigate(id)}
          >
            <span className="tile-menu__icon-wrap">
              <Icon width={28} height={28} />
            </span>
            <span className="tile-menu__body">
              <span className="tile-menu__title">{title}</span>
              <span className="tile-menu__subtitle">{subtitle}</span>
            </span>
            {index === 0 ? <span className="tile-menu__arrow" aria-hidden>›</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
};

TileMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
