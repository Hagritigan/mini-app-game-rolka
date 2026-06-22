import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { openExternalLink } from '../../utils/openExternalLink';
import './EquipmentCard.css';

function CardImage({ src, alt, className, fallbackClassName }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (!src || hasError) {
    return <div className={fallbackClassName} aria-hidden />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}

CardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fallbackClassName: PropTypes.string.isRequired,
};

export function EquipmentCard({ item }) {
  const hasOwner = Boolean(item.ownerName);
  const hasOwnerLink = Boolean(item.ownerName && item.ownerUrl);

  return (
    <article className="equipment-card">
      <div className="equipment-card__showcase">
        <CardImage
          src={item.equipmentImage}
          alt={item.title || 'Снаряжение'}
          className="equipment-card__image"
          fallbackClassName="equipment-card__image-fallback"
        />
        <div className="equipment-card__showcase-shade" aria-hidden />
        {hasOwner ? (
          <div className="equipment-card__owner">
            <span className="equipment-card__owner-label">Владелец</span>
            {hasOwnerLink ? (
              <a
                className="equipment-card__owner-name equipment-card__owner-link"
                href={item.ownerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => openExternalLink(item.ownerUrl, event)}
              >
                {item.ownerName}
              </a>
            ) : (
              <span className="equipment-card__owner-name">{item.ownerName}</span>
            )}
          </div>
        ) : null}
      </div>

      <div className="equipment-card__body">
        {item.title ? <h3 className="equipment-card__title">{item.title}</h3> : null}
        {item.description ? (
          <p className="equipment-card__description">{item.description}</p>
        ) : null}
      </div>
    </article>
  );
}

EquipmentCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    equipmentImage: PropTypes.string,
    ownerName: PropTypes.string,
    ownerUrl: PropTypes.string,
  }).isRequired,
};
