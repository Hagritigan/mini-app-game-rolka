export const SHOP_ORDERS_TOPIC_URL = 'https://vk.com/topic-36291248_32402842';
export const SHOP_ORDERS_TOPIC_POSTS_PER_PAGE = 20;

export function getShopOrdersTopicFallbackMeta() {
  return {
    topicUrl: SHOP_ORDERS_TOPIC_URL,
    postsPerPage: SHOP_ORDERS_TOPIC_POSTS_PER_PAGE,
    count: null,
    lastOffset: 0,
    lastPageUrl: SHOP_ORDERS_TOPIC_URL,
  };
}
