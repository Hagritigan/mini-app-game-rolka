import PropTypes from 'prop-types';
import './ShopQuantityField.css';

const MIN_QUANTITY = 1;

function normalizeQuantity(value) {
  const parsed = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsed)) {
    return MIN_QUANTITY;
  }

  return Math.max(MIN_QUANTITY, parsed);
}

export function ShopQuantityField({ value, onChange, disabled = false }) {
  const handleDecrease = () => {
    if (value <= MIN_QUANTITY || disabled) {
      return;
    }

    onChange(value - 1);
  };

  const handleIncrease = () => {
    if (disabled) {
      return;
    }

    onChange(value + 1);
  };

  const handleInputChange = (event) => {
    const nextValue = event.target.value.replace(/\D/g, '');

    if (!nextValue) {
      onChange(MIN_QUANTITY);
      return;
    }

    onChange(normalizeQuantity(nextValue));
  };

  const handleBlur = () => {
    onChange(normalizeQuantity(value));
  };

  return (
    <div className="shop-quantity">
      <label className="shop-quantity__label" htmlFor="shop-quantity-input">
        Количество
      </label>

      <div className="shop-quantity__control">
        <button
          type="button"
          className="shop-quantity__button"
          aria-label="Уменьшить количество"
          disabled={disabled || value <= MIN_QUANTITY}
          onClick={handleDecrease}
        >
          −
        </button>

        <input
          id="shop-quantity-input"
          className="shop-quantity__input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoComplete="off"
          spellCheck={false}
        />

        <button
          type="button"
          className="shop-quantity__button"
          aria-label="Увеличить количество"
          disabled={disabled}
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

ShopQuantityField.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
