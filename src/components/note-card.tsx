import type { Note, Tag } from '../data/models';
import { renderMarkdown } from '../utils/markdown';
import './note-card.css';

type Props = {
  note: Note;
  tags: Tag[];
  onOpen: (id: string) => void;
};

export default function NoteCard({ note, tags, onOpen }: Props) {
  const excerpt = note.contentMD.split('\n').slice(0, 2).join(' ');
  return (
    <article
      class="note-card"
      onClick={() => onOpen(note.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(note.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <header>
        <h3>{note.title}</h3>
        {note.pinned ? <span class="badge">Épinglée</span> : null}
      </header>
      <div class="content" dangerouslySetInnerHTML={{ __html: renderMarkdown(excerpt) }} />
      {note.tags.length ? (
        <ul class="tags">
          {note.tags.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            if (!tag) return null;
            return (
              <li key={tag.id} style={{ background: tag.color ?? 'rgba(255,255,255,0.08)' }}>
                #{tag.name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}
