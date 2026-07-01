export function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function parseCell(htmlCell) {
  const photoMatch = htmlCell.match(/<a[^>]*class="wk_photo"[^>]*href="([^"]+)"[^>]*>/i);
  if (photoMatch) {
    const href = photoMatch[1].startsWith('http')
      ? photoMatch[1]
      : `https://vk.com${photoMatch[1]}`;

    return {
      text: href,
      link: href,
    };
  }

  const linkMatch = htmlCell.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
  const text = decodeEntities(
    htmlCell
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<img[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

  if (!linkMatch) {
    return { text };
  }

  const href = linkMatch[1].startsWith('http')
    ? linkMatch[1]
    : `https://vk.com${linkMatch[1]}`;

  const linkText = decodeEntities(
    linkMatch[2]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  ) || text;

  return {
    text: linkText || text,
    link: href,
  };
}

export function parseWikiTable(html) {
  const tableMatch = html.match(/<table[^>]*class="wk_table[^"]*"[\s\S]*?<\/table>/i);

  if (!tableMatch) {
    throw new Error('Таблица на странице не найдена');
  }

  const rowMatches = [...tableMatch[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];

  return rowMatches
    .map((rowMatch) => {
      const cells = [...rowMatch[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)]
        .map((cellMatch) => parseCell(cellMatch[1]));

      return cells.length ? cells : null;
    })
    .filter(Boolean)
    .filter((row) => row.some((cell) => cell.text));
}

export async function fetchPageHtml(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'ru-RU,ru;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`Не удалось загрузить страницу (${response.status})`);
  }

  const charset = response.headers.get('content-type')?.match(/charset=([\w-]+)/i)?.[1]
    ?? 'windows-1251';

  return new TextDecoder(charset).decode(await response.arrayBuffer());
}

export function normalizeName(value) {
  return String(value ?? '')
    .replace(/["«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
