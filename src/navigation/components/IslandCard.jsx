import PropTypes from 'prop-types';
import { openExternalLink } from '../../utils/openExternalLink';
import { getInfluenceCount, getInfluenceStyle } from '../utils/islandInfluence';
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

const metaShape = PropTypes.shape({
  influences: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
  })),
  hasDozor: PropTypes.bool,
  hasPp: PropTypes.bool,
  dozor: PropTypes.string,
  pp: PropTypes.string,
});

function IslandCardInner({
  island,
  className,
  style,
  onOpenModal,
  influenceCount,
  title,
}) {
  const cardClassName = [
    'island-card',
    className,
    influenceCount === 0 ? 'island-card--neutral' : 'island-card--influenced',
  ].filter(Boolean).join(' ');

  const content = <span className="island-card__title">{title}</span>;

  if (island.modal) {
    return (
      <div
        className={cardClassName}
        style={{ cursor: 'pointer', ...style }}
        onClick={() => onOpenModal?.(island)}
      >
        {content}
      </div>
    );
  }

  if (!island.link) {
    return (
      <div className={cardClassName} style={style}>
        {content}
      </div>
    );
  }

  return (
    <NavigationLink className={cardClassName} href={island.link} style={style}>
      {content}
    </NavigationLink>
  );
}

IslandCardInner.propTypes = {
  island: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    modal: PropTypes.bool,
    childrens: PropTypes.array,
  }).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onOpenModal: PropTypes.func,
  influenceCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export function IslandCard({ island, meta, className = 'islandCard', style, onOpenModal }) {
  const influenceCount = getInfluenceCount(meta);
  const influenceStyle = getInfluenceStyle(meta);
  const mergedStyle = { ...influenceStyle, ...style };

  if (influenceCount >= 2) {
    return (
      <div className="island-card-frame island-card-frame--multi" style={mergedStyle}>
        <IslandCardInner
          island={island}
          className={className}
          onOpenModal={onOpenModal}
          influenceCount={influenceCount}
          title={island.title}
        />
      </div>
    );
  }

  return (
    <div className="island-card-frame" style={influenceCount === 1 ? influenceStyle : undefined}>
      <IslandCardInner
        island={island}
        className={className}
        style={influenceCount === 1 ? mergedStyle : style}
        onOpenModal={onOpenModal}
        influenceCount={influenceCount}
        title={island.title}
      />
    </div>
  );
}

IslandCard.propTypes = {
  island: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    modal: PropTypes.bool,
    childrens: PropTypes.array,
  }).isRequired,
  meta: metaShape,
  className: PropTypes.string,
  style: PropTypes.object,
  onOpenModal: PropTypes.func,
};
