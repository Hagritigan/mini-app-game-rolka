import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormItem, Input, Textarea } from '@vkontakte/vkui';
import { sendShopOrder } from '../../utils/sendShopOrder';
import './ShopOrderForm.css';

const INITIAL_FORM = {
  characterName: '',
  quantity: '1',
  comment: '',
};

export function ShopOrderForm({ product, onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const characterName = form.characterName.trim();
    const quantity = form.quantity.trim() || '1';
    const comment = form.comment.trim();

    if (!characterName) {
      setError('Укажите имя персонажа');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    const result = await sendShopOrder({
      lot: product.lot ?? '',
      category: product.category ?? '',
      name: product.name,
      price: product.price,
      priceNumber: product.priceNumber ?? null,
      characterName,
      quantity,
      comment,
    });

    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      onSuccess?.();
      return;
    }

    setError(result.error);
  };

  return (
    <form className="shop-order-form" onSubmit={handleSubmit}>
      <div className="shop-order-form__title">Оформление заявки</div>

      <FormItem top="Имя персонажа" status={error && !form.characterName.trim() ? 'error' : 'default'}>
        <Input
          value={form.characterName}
          onChange={updateField('characterName')}
          placeholder="Как в игре"
          disabled={submitting || success}
        />
      </FormItem>

      <FormItem top="Количество">
        <Input
          type="number"
          min="1"
          inputMode="numeric"
          value={form.quantity}
          onChange={updateField('quantity')}
          disabled={submitting || success}
        />
      </FormItem>

      <FormItem top="Комментарий">
        <Textarea
          value={form.comment}
          onChange={updateField('comment')}
          placeholder="Остров, уточнения по покупке..."
          disabled={submitting || success}
        />
      </FormItem>

      {error ? <div className="shop-order-form__message shop-order-form__message--error">{error}</div> : null}
      {success ? (
        <div className="shop-order-form__message shop-order-form__message--success">
          Заявка отправлена. Администрация увидит её в беседе магазина.
        </div>
      ) : null}

      <Button
        size="l"
        stretched
        mode="primary"
        type="submit"
        loading={submitting}
        disabled={success}
      >
        {success ? 'Заявка отправлена' : 'Отправить заявку'}
      </Button>
    </form>
  );
}

ShopOrderForm.propTypes = {
  product: PropTypes.shape({
    lot: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    priceNumber: PropTypes.number,
  }).isRequired,
  onSuccess: PropTypes.func,
};
