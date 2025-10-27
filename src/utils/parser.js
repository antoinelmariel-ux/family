const dueRegex = /!(aujourd'hui|demain|\d{4}-\d{2}-\d{2})/i;
const tagRegex = /#(\w+)/g;
const storeRegex = /@(\w+)/;

export function parseSmartInput(raw) {
  const lines = raw.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] ?? '';
  const matches = [...firstLine.matchAll(tagRegex)];
  const tags = matches.map((m) => m[1].toLowerCase());
  const dueMatch = firstLine.match(dueRegex);
  const storeMatch = raw.match(storeRegex);

  let type = 'note';
  if (raw.startsWith('- ') || raw.includes('\n- ')) {
    type = 'task';
  }
  if (raw.includes('[ ]')) {
    type = 'note';
  }
  if (storeMatch) {
    type = 'grocery';
  }

  let due;
  if (dueMatch) {
    const keyword = dueMatch[1].toLowerCase();
    if (keyword === "aujourd'hui") {
      due = new Date().toISOString().split('T')[0];
    } else if (keyword === 'demain') {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      due = date.toISOString().split('T')[0];
    } else {
      due = keyword;
    }
  }

  const title = firstLine.replace(tagRegex, '').replace(dueRegex, '').trim() || 'Nouvel élément';

  return {
    type,
    title,
    tags,
    due,
    store: storeMatch ? storeMatch[1] : undefined,
    lines
  };
}
