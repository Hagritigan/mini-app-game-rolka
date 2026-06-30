const SHOP_ORDER_DASH = '—';

function formatPiecesWord(quantity) {
  const value = Math.abs(quantity) % 100;
  const remainder = value % 10;

  if (value > 10 && value < 20) {
    return 'штук';
  }

  if (remainder > 1 && remainder < 5) {
    return 'штуки';
  }

  if (remainder === 1) {
    return 'штука';
  }

  return 'штук';
}

function formatLotLine(lotName, quantity) {
  const name = lotName?.trim() || SHOP_ORDER_DASH;

  if (!Number.isFinite(quantity) || quantity <= 1) {
    return `2. ${name}`;
  }

  return `2. "${name}", ${quantity} ${formatPiecesWord(quantity)}`;
}

export function formatShopOrderText({
  lotName,
  quantity,
  personalFileLink,
  locationLink,
  discountNotes,
}) {
  const coupon = discountNotes?.trim() || SHOP_ORDER_DASH;
  const personalFile = personalFileLink?.trim() || SHOP_ORDER_DASH;
  const location = locationLink?.trim() || SHOP_ORDER_DASH;

  return [
    '1. Магазин',
    '',
    formatLotLine(lotName, quantity),
    '',
    `3. ${coupon}`,
    '',
    `4. ${personalFile}`,
    '',
    `5. ${location}`,
  ].join('\n');
}
