import PropTypes from 'prop-types';
import { openExternalLink } from '../../utils/openExternalLink';
import { IslandMetaBadges } from './IslandMetaBadges';
import './IslandCard.css';

function NavigationLink({ href, className, style, children, onClick }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onClick={(event) => {
        onClick?.(event);
        openExternalLink(href, event);
      }}
    >
      {children}
    </a>
  );
}

NavigationLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

function IslandBadges({ meta, onOpenMeta, islandTitle }) {
  return <IslandMetaBadges meta={meta} islandTitle={islandTitle} onOpenMeta={onOpenMeta} />;
}

IslandBadges.propTypes = {
  meta: PropTypes.shape({
    hasDozor: PropTypes.bool,
    hasPp: PropTypes.bool,
    dozor: PropTypes.string,
    pp: PropTypes.string,
  }),
  onOpenMeta: PropTypes.func,
  islandTitle: PropTypes.string.isRequired,
};

export function IslandCard({ island, meta, className = 'islandCard', style, onOpenModal, onOpenMeta }) {
  const content = (
    <>
      <span className="island-card__title">{island.title}</span>
      <IslandBadges meta={meta} onOpenMeta={onOpenMeta} islandTitle={island.title} />
    </>
  );

  if (island.modal) {
    return (
      <div
        className={`island-card island-card--modal ${className}`}
        style={{ cursor: 'pointer', ...style }}
        onClick={() => onOpenModal?.(island)}
      >
        {content}
      </div>
    );
  }

  if (!island.link) {
    return (
      <div className={`island-card ${className}`} style={style}>
        {content}
      </div>
    );
  }

  return (
    <NavigationLink className={`island-card ${className}`} href={island.link} style={style}>
      {content}
    </NavigationLink>
  );
}

IslandCard.propTypes = {
  island: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    modal: PropTypes.bool,
    childrens: PropTypes.array,
  }).isRequired,
  meta: PropTypes.shape({
    hasDozor: PropTypes.bool,
    hasPp: PropTypes.bool,
    dozor: PropTypes.string,
    pp: PropTypes.string,
  }),
  className: PropTypes.string,
  style: PropTypes.object,
  onOpenModal: PropTypes.func,
  onOpenMeta: PropTypes.func,
};
