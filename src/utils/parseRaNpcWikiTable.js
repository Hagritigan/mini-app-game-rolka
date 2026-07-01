function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function parseImageCell(htmlCell) {
  const imgSrc = htmlCell.match(/<img[^>]*src="([^"]+)"/i)?.[1];
  const photoHref = htmlCell.match(/<a[^>]*href="([^"]+)"/i)?.[1];

  const imageLink = photoHref
    ? (photoHref.startsWith('http') ? photoHref : `https://vk.com${photoHref}`)
    : null;

  return {
    imageUrl: imgSrc ?? null,
    imageLink,
  };
}

function parseTextCell(htmlCell) {
  return decodeEntities(
    htmlCell
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<img[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function parseBackstoryCell(htmlCell) {
  const titleMatch = htmlCell.match(/wk_hider_title[^>]*>([\s\S]*?)<\/div>/i);
  const bodyMatch = htmlCell.match(/<div class="wk_hider_body">([\s\S]*?)<\/div>\s*<\/div>\s*$/i);

  if (titleMatch && bodyMatch) {
    return {
      backstoryTitle: parseTextCell(titleMatch[1]),
      backstory: parseTextCell(bodyMatch[1]),
    };
  }

  return {
    backstoryTitle: null,
    backstory: parseTextCell(htmlCell),
  };
}

export function parseRaNpcWikiTable(html) {
  const tableMatch = html.match(/<table[^>]*class="wk_table[^"]*"[\s\S]*?<\/table>/i);

  if (!tableMatch) {
    throw new Error('Таблица NPC на странице не найдена');
  }

  const rowMatches = [...tableMatch[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];

  return rowMatches
    .map((rowMatch) => {
      const cells = [...rowMatch[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)]
        .map((cellMatch) => cellMatch[1]);

      if (cells.length < 3) {
        return null;
      }

      const name = parseTextCell(cells[0]);
      const rank = parseTextCell(cells[1]);
      const { backstoryTitle, backstory } = parseBackstoryCell(cells[2]);
      const image = cells[3] ? parseImageCell(cells[3]) : { imageUrl: null, imageLink: null };

      if (!name || name === 'Имя') {
        return null;
      }

      return {
        name,
        rank,
        backstoryTitle,
        backstory,
        imageUrl: image.imageUrl,
        imageLink: image.imageLink,
      };
    })
    .filter(Boolean);
}
