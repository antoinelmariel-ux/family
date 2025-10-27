import { html } from '../lib/ui.js';
import { useState } from '../lib/hooks.js';
import NoteCard from '../components/note-card.js';
import { getNotes, getTags } from '../data/store.js';

const segments = ['Tous', 'Favoris'];

export default function NotesPage() {
  const [segment, setSegment] = useState('Tous');
  const notes = getNotes().value;
  const tags = getTags().value;

  const filtered = notes.filter((note) => {
    if (segment === 'Favoris') {
      return Boolean(note.pinned);
    }
    return true;
  });

  const openNote = (id) => {
    console.info('Open note', id);
    alert('Édition de note bientôt disponible.');
  };

  return html`
    <section class="notes">
      <div class="segments" role="tablist">
        ${segments.map(
          (seg) => html`
            <button
              key=${seg}
              role="tab"
              class=${segment === seg ? 'active' : ''}
              onClick=${() => setSegment(seg)}
            >
              ${seg}
            </button>
          `
        )}
      </div>
      <div>
        ${filtered.length
          ? filtered.map((note) => html`<${NoteCard} key=${note.id} note=${note} tags=${tags} onOpen=${openNote} />`)
          : html`<p class="empty">Aucune note pour ce filtre.</p>`}
      </div>
    </section>
  `;
}
