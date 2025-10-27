import { html } from '../lib/ui.js';
import { renderMarkdown } from '../utils/markdown.js';

export default function NoteCard({ note, tags, onOpen }) {
  const excerpt = note.contentMD.split('\n').slice(0, 2).join(' ');
  return html`
    <article
      class="note-card"
      onClick=${() => onOpen(note.id)}
      onKeyDown=${(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(note.id);
        }
      }}
      role="button"
      tabIndex=${0}
    >
      <header>
        <h3>${note.title}</h3>
        ${note.pinned ? html`<span class="badge">Épinglée</span>` : null}
      </header>
      <div class="content" dangerouslySetInnerHTML=${{ __html: renderMarkdown(excerpt) }}></div>
      ${note.tags.length
        ? html`<ul class="tags">
            ${note.tags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              if (!tag) return null;
              return html`<li key=${tag.id} style=${{ background: tag.color ?? 'rgba(255,255,255,0.08)' }}>
                #${tag.name}
              </li>`;
            })}
          </ul>`
        : null}
    </article>
  `;
}
