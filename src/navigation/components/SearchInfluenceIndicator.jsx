import PropTypes from 'prop-types';
import { getInfluenceCount, getInfluences } from '../utils/islandInfluence';
import './SearchInfluenceIndicator.css';

export function SearchInfluenceIndicator({ meta }) {
  const influences = getInfluences(meta);

  if (getInfluenceCount(meta) === 0) {
    return null;
  }

  return (
    <div className="search-influence" aria-hidden="true">
      {influences.map((influence) => (
        <span
          key={influence.id}
          className="search-influence__segment"
          style={{ background: influence.color }}
        />
      ))}
    </div>
  );
}

SearchInfluenceIndicator.propTypes = {
  meta: PropTypes.shape({
    influences: PropTypes.array,
    hasDozor: PropTypes.bool,
    hasPp: PropTypes.bool,
  }),
};
