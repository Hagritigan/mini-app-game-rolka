export function formatShopPrice(value) {
  const text = String(value ?? '').trim();

  if (!text || text === '-') {
    return '—';
  }

  if (/[^\d]/.test(text)) {
    return text;
  }

  const digits = text.replace(/\D/g, '');

  if (!digits) {
    return text;
  }

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function parseShopPriceNumber(value) {
  const text = String(value ?? '').trim();

  if (!text || text === '-') {
    return null;
  }

  const digits = text.replace(/\D/g, '');
  return digits ? Number(digits) : null;
}
