const NAVIGATION_SPREADSHEET_ID = '1e-y_ddIUAJoJ_ep4qfA4GuBd8hWksIocqWSdjEsUK1o';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i += 1; }
      else if (char === '"') inQuotes = false;
      else field += char;
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\r' && next === '\n') { row.push(field); rows.push(row); row = []; field = ''; i += 1; }
    else if (char === '\n' || char === '\r') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

async function main() {
  const csvRes = await fetch(
    `https://docs.google.com/spreadsheets/d/${NAVIGATION_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=0`,
  );
  const rows = parseCsv(await csvRes.text()).slice(1);
  const withPP = rows.filter((r) => (r[3] || '').trim());
  const withDozor = rows.filter((r) => (r[2] || '').trim());
  console.log('With Dozor:', withDozor.length);
  console.log('With PP:', withPP.length);
  console.log('\nPP samples:');
  withPP.slice(0, 8).forEach((r) => console.log(r[0], '|', r[3].slice(0, 80)));
  console.log('\nAll islands:');
  rows.forEach((r) => {
    const link = (r[1] || '').trim();
    const dozor = (r[2] || '').trim();
    const pp = (r[3] || '').trim();
    if (!link) return;
    console.log(`${r[0]} | D:${dozor ? 'yes' : 'no'} | PP:${pp ? 'yes' : 'no'}`);
  });
}

main().catch(console.error);
