import PropTypes from 'prop-types';
import { MetaBadge } from './MetaBadge';
import './MetaBadge.css';

export function IslandMetaBadges({ meta, islandTitle, onOpenMeta }) {
  if (!meta?.hasDozor && !meta?.hasPp) {
    return null;
  }

  return (
    <div className="island-card__badges">
      {meta.hasDozor ? (
        <MetaBadge
          kind="dozor"
          label="Д"
          text={meta.dozor}
          islandTitle={islandTitle}
          onOpenMeta={onOpenMeta}
        />
      ) : null}
      {meta.hasPp ? (
        <MetaBadge
          kind="pp"
          label="ПП"
          text={meta.pp}
          islandTitle={islandTitle}
          onOpenMeta={onOpenMeta}
        />
      ) : null}
    </div>
  );
}

IslandMetaBadges.propTypes = {
  meta: PropTypes.shape({
    hasDozor: PropTypes.bool,
    hasPp: PropTypes.bool,
    dozor: PropTypes.string,
    pp: PropTypes.string,
  }),
  islandTitle: PropTypes.string.isRequired,
  onOpenMeta: PropTypes.func,
};

export function SearchMetaBadges({ meta, islandTitle, onOpenMeta }) {
  if (!meta?.hasDozor && !meta?.hasPp) {
    return null;
  }

  return (
    <div className="island-card__badges">
      {meta.hasDozor ? (
        <MetaBadge
          kind="dozor"
          label="Д"
          text={meta.dozor}
          islandTitle={islandTitle}
          onOpenMeta={onOpenMeta}
        />
      ) : null}
      {meta.hasPp ? (
        <MetaBadge
          kind="pp"
          label="ПП"
          text={meta.pp}
          islandTitle={islandTitle}
          onOpenMeta={onOpenMeta}
        />
      ) : null}
    </div>
  );
}

SearchMetaBadges.propTypes = {
  meta: PropTypes.shape({
    hasDozor: PropTypes.bool,
    hasPp: PropTypes.bool,
    dozor: PropTypes.string,
    pp: PropTypes.string,
  }),
  islandTitle: PropTypes.string.isRequired,
  onOpenMeta: PropTypes.func,
};
