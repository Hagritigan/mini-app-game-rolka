import PropTypes from 'prop-types';
import './ShopProductCard.css';

export function ShopProductCard({ item, onOpen }) {
  return (
    <button type="button" className="shop-product-card" onClick={() => onOpen(item)}>
      <div className="shop-product-card__main">
        {item.lot ? <span className="shop-product-card__lot">{item.lot}</span> : null}
        <span className="shop-product-card__name">{item.name}</span>
      </div>
      <span className="shop-product-card__price">{item.price}</span>
    </button>
  );
}

ShopProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    lot: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};
