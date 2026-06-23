export function normalizeTopicLink(link) {
  return String(link || '')
    .trim()
    .toLowerCase()
    .replace(/\/$/, '');
}
