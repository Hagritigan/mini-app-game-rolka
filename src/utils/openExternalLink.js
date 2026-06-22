import vkBridge from '@vkontakte/vk-bridge';

export function openExternalLink(url, event) {
  if (!url) {
    return;
  }

  if (!vkBridge.isEmbedded()) {
    if (!event) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return;
  }

  event?.preventDefault();

  vkBridge.send('VKWebAppOpenLink', { url }).catch(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
