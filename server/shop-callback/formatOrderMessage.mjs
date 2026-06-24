export function formatShopOrderMessage(order, userId) {
  const lines = [
    '🛒 Заявка из магазина',
    '',
    `Игрок: https://vk.com/id${userId}`,
  ];

  if (order.characterName) {
    lines.push(`Персонаж: ${order.characterName}`);
  }

  if (order.category) {
    lines.push(`Категория: ${order.category}`);
  }

  if (order.lot) {
    lines.push(`Лот: ${order.lot}`);
  }

  lines.push(`Товар: ${order.name}`);

  if (order.price) {
    lines.push(`Цена: ${order.price}`);
  }

  if (order.quantity && order.quantity !== '1') {
    lines.push(`Количество: ${order.quantity}`);
  }

  if (order.comment) {
    lines.push(`Комментарий: ${order.comment}`);
  }

  if (order.createdAt) {
    lines.push('');
    lines.push(`Время: ${order.createdAt}`);
  }

  return lines.join('\n');
}

export function parseShopOrderPayload(rawPayload) {
  if (!rawPayload) {
    return null;
  }

  let payload = rawPayload;

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return null;
    }
  }

  if (payload?.type !== 'shop_order' || !payload?.name) {
    return null;
  }

  return payload;
}
