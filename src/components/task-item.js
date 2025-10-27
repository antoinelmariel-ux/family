import { html } from '../lib/ui.js';
import { toggleTask } from '../data/store.js';
import { formatDate, isPast, isToday } from '../utils/dates.js';

export default function TaskItem({ task, tags }) {
  const dueLabel = task.due ? formatDate(task.due) : null;
  return html`
    <label class="task-item ${task.done ? 'done' : ''}">
      <input type="checkbox" checked=${task.done} onChange=${() => toggleTask(task.id)} />
      <div class="content">
        <div class="title-row">
          <span class="title">${task.title}</span>
          ${dueLabel
            ? html`<span class="due ${isPast(task.due) && !task.done ? 'past' : isToday(task.due) ? 'today' : ''}">
                ${dueLabel}
              </span>`
            : null}
        </div>
        ${task.note ? html`<p class="note">${task.note}</p>` : null}
        ${task.tags.length
          ? html`<ul class="tags">
              ${task.tags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                if (!tag) return null;
                return html`<li key=${tag.id} style=${{ background: tag.color ?? 'rgba(255,255,255,0.08)' }}>
                  #${tag.name}
                </li>`;
              })}
            </ul>`
          : null}
      </div>
    </label>
  `;
}
