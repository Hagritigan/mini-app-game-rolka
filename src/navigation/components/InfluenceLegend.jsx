import PropTypes from 'prop-types';
import './InfluenceLegend.css';

export function InfluenceLegend({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="influence-legend" aria-label="Обозначения цветов влияния">
      {items.map((item) => (
        <div key={item.id} className="influence-legend__item">
          <span
            className="influence-legend__swatch"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="influence-legend__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

InfluenceLegend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })),
};
