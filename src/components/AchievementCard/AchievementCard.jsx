import PropTypes from 'prop-types';
import { parsePoints } from '../../utils/parsePoints';
import './AchievementCard.css';

export function AchievementCard({ item }) {
  const points = item.points ? parsePoints(item.points) : null;

  return (
    <article className="achievement-card">
      <div className="achievement-card__main">
        {item.icon ? (
          <span className="achievement-card__icon" aria-hidden>
            {item.icon}
          </span>
        ) : null}
        <div className="achievement-card__content">
          <h3 className="achievement-card__title">{item.title}</h3>
          {item.description ? (
            <p className="achievement-card__description">{item.description}</p>
          ) : null}
          {item.note ? <p className="achievement-card__note">{item.note}</p> : null}
        </div>
      </div>

      {points ? (
        <div
          className={`achievement-card__points${points.value ? '' : ' achievement-card__points--text-only'}`}
          aria-label={`Награда: ${item.points}`}
        >
          {points.value ? (
            <div className="achievement-card__points-value">{points.value}</div>
          ) : null}
          {points.label ? (
            <p className="achievement-card__points-label">{points.label}</p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

AchievementCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    note: PropTypes.string,
    points: PropTypes.string,
  }).isRequired,
};
