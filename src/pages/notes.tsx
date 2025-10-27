import { useState } from 'preact/hooks';
import NoteCard from '../components/note-card';
import { getNotes, getTags } from '../data/store';
import './notes.css';

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

  const openNote = (id: string) => {
    console.info('Open note', id);
    alert('Édition de note bientôt disponible.');
  };

  return (
    <section class="notes">
      <div class="segments" role="tablist">
        {segments.map((seg) => (
          <button
            key={seg}
            role="tab"
            class={segment === seg ? 'active' : ''}
            onClick={() => setSegment(seg)}
          >
            {seg}
          </button>
        ))}
      </div>
      <div>
        {filtered.length ? (
          filtered.map((note) => <NoteCard key={note.id} note={note} tags={tags} onOpen={openNote} />)
        ) : (
          <p class="empty">Aucune note pour ce filtre.</p>
        )}
      </div>
    </section>
  );
}
