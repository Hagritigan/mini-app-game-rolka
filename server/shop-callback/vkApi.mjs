const VK_API_VERSION = '5.199';

export async function vkApi(method, params, accessToken) {
  const body = new URLSearchParams({
    ...params,
    access_token: accessToken,
    v: VK_API_VERSION,
  });

  const response = await fetch(`https://api.vk.com/method/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.error_msg || `VK API error ${json.error.error_code}`);
  }

  return json.response;
}

export async function sendChatMessage({ peerId, message, accessToken }) {
  return vkApi('messages.send', {
    peer_id: String(peerId),
    random_id: String(Date.now()),
    message,
  }, accessToken);
}
