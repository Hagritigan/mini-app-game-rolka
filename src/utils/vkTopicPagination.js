export function parseVkTopicPostCount(html) {
  const match = String(html).match(/"count"\s*:\s*(\d+)/);

  if (!match) {
    return null;
  }

  const count = Number(match[1]);

  return Number.isFinite(count) ? count : null;
}

export function getVkTopicLastPageOffset(postCount, postsPerPage = 20) {
  if (!postCount || postCount <= 0) {
    return 0;
  }

  return Math.max(0, Math.floor((postCount - 1) / postsPerPage) * postsPerPage);
}

export function buildVkTopicPageUrl(topicUrl, offset = 0) {
  const baseUrl = String(topicUrl || '').split('?')[0];

  if (!baseUrl) {
    return '';
  }

  if (!offset) {
    return baseUrl;
  }

  return `${baseUrl}?offset=${offset}`;
}

export function buildVkTopicLastPageMeta({
  topicUrl,
  postCount,
  postsPerPage = 20,
}) {
  const lastOffset = getVkTopicLastPageOffset(postCount, postsPerPage);

  return {
    topicUrl,
    postsPerPage,
    count: postCount,
    lastOffset,
    lastPageUrl: buildVkTopicPageUrl(topicUrl, lastOffset),
  };
}
