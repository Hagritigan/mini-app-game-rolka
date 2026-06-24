import vkBridge from '@vkontakte/vk-bridge';
import { SHOP_COMMUNITY_GROUP_ID, SHOP_ORDER_PAYLOAD_TYPE } from '../config/shop';

function getPayloadErrorMessage(error) {
  const code = error?.error_data?.error_code ?? error?.error_type;

  if (code === 1 || code === 'client_error') {
    return 'Не удалось отправить заявку. Убедитесь, что мини-приложение запущено из сообщества ролки.';
  }

  return error?.error_data?.error_reason
    ?? error?.error_data?.error_description
    ?? error?.message
    ?? 'Не удалось отправить заявку';
}

/**
 * @param {object} order
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function sendShopOrder(order) {
  try {
    const data = await vkBridge.send('VKWebAppSendPayload', {
      group_id: SHOP_COMMUNITY_GROUP_ID,
      payload: {
        type: SHOP_ORDER_PAYLOAD_TYPE,
        ...order,
        createdAt: new Date().toISOString(),
      },
    });

    if (data?.result) {
      return { ok: true };
    }

    return { ok: false, error: 'Сообщество не приняло заявку' };
  } catch (error) {
    return { ok: false, error: getPayloadErrorMessage(error) };
  }
}
