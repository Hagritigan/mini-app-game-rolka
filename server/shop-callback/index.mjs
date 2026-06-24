import { createServer } from 'http';
import { formatShopOrderMessage, parseShopOrderPayload } from './formatOrderMessage.mjs';
import { sendChatMessage } from './vkApi.mjs';

const PORT = Number(process.env.PORT || 3001);
const VK_GROUP_TOKEN = process.env.VK_GROUP_TOKEN ?? '';
const VK_CONFIRMATION_TOKEN = process.env.VK_CONFIRMATION_TOKEN ?? '';
const VK_CALLBACK_SECRET = process.env.VK_CALLBACK_SECRET ?? '';
const VK_ORDER_PEER_ID = process.env.VK_ORDER_PEER_ID ?? '2000000132';

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on('data', (chunk) => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    request.on('error', reject);
  });
}

async function handleAppPayload(object) {
  if (!VK_GROUP_TOKEN || !VK_ORDER_PEER_ID) {
    console.error('[shop-callback] VK_GROUP_TOKEN or VK_ORDER_PEER_ID is not configured');
    return;
  }

  const order = parseShopOrderPayload(object?.payload);

  if (!order) {
    console.warn('[shop-callback] Ignored app_payload with unknown payload:', object?.payload);
    return;
  }

  const message = formatShopOrderMessage(order, object.user_id);

  await sendChatMessage({
    peerId: VK_ORDER_PEER_ID,
    message,
    accessToken: VK_GROUP_TOKEN,
  });

  console.log(`[shop-callback] Order sent to peer ${VK_ORDER_PEER_ID} from user ${object.user_id}`);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'POST') {
    response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Method Not Allowed');
    return;
  }

  try {
    const body = await readBody(request);
    const data = JSON.parse(body);

    if (VK_CALLBACK_SECRET && data.secret !== VK_CALLBACK_SECRET) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Forbidden');
      return;
    }

    if (data.type === 'confirmation') {
      if (!VK_CONFIRMATION_TOKEN) {
        response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Confirmation token is not configured');
        return;
      }

      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(VK_CONFIRMATION_TOKEN);
      return;
    }

    if (data.type === 'app_payload') {
      handleAppPayload(data.object).catch((error) => {
        console.error('[shop-callback] Failed to handle app_payload:', error.message);
      });
    }

    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('ok');
  } catch (error) {
    console.error('[shop-callback] Request error:', error.message);
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('error');
  }
});

server.listen(PORT, () => {
  console.log(`[shop-callback] Listening on http://127.0.0.1:${PORT}`);

  if (!VK_GROUP_TOKEN) {
    console.warn('[shop-callback] VK_GROUP_TOKEN is missing');
  }

  if (!VK_ORDER_PEER_ID) {
    console.warn('[shop-callback] VK_ORDER_PEER_ID is missing');
  }
});
