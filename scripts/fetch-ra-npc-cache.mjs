import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { RA_NPC_WIKI_PAGE_URL } from '../src/config/raNpc.js';
import { parseRaNpcWikiTable } from '../src/utils/parseRaNpcWikiTable.js';
import { fetchPageHtml } from './vkWikiTableUtils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const html = await fetchPageHtml(RA_NPC_WIKI_PAGE_URL);
const npcs = parseRaNpcWikiTable(html);

if (npcs.length === 0) {
  throw new Error('Список NPC РА пуст');
}

const data = {
  updatedAt: new Date().toISOString(),
  sourceUrl: RA_NPC_WIKI_PAGE_URL,
  npcs,
};

writeFileSync(join(outDir, 'ra-npc-list.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`ra-npc-list.json: ${npcs.length} npcs`);
