import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  SHOP_ORDERS_TOPIC_POSTS_PER_PAGE,
  SHOP_ORDERS_TOPIC_URL,
} from '../src/config/shopOrdersTopic.js';
import {
  buildVkTopicLastPageMeta,
  parseVkTopicPostCount,
} from '../src/utils/vkTopicPagination.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const response = await fetch(SHOP_ORDERS_TOPIC_URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept-Language': 'ru-RU,ru;q=0.9',
  },
});

if (!response.ok) {
  throw new Error(`Failed to fetch shop orders topic (${response.status})`);
}

const html = await response.text();
const postCount = parseVkTopicPostCount(html);

if (!postCount) {
  throw new Error('Failed to parse shop orders topic post count');
}

const data = {
  updatedAt: new Date().toISOString(),
  ...buildVkTopicLastPageMeta({
    topicUrl: SHOP_ORDERS_TOPIC_URL,
    postCount,
    postsPerPage: SHOP_ORDERS_TOPIC_POSTS_PER_PAGE,
  }),
};

writeFileSync(join(outDir, 'shop-orders-topic.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`shop-orders-topic.json: count=${data.count}, lastOffset=${data.lastOffset}`);
