import type { Task, Tag } from '../data/models';
import { toggleTask } from '../data/store';
import { formatDate, isPast, isToday } from '../utils/dates';
import './task-item.css';

type Props = {
  task: Task;
  tags: Tag[];
};

export default function TaskItem({ task, tags }: Props) {
  const dueLabel = task.due ? formatDate(task.due) : null;
  return (
    <label class={`task-item ${task.done ? 'done' : ''}`}>
      <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
      <div class="content">
        <div class="title-row">
          <span class="title">{task.title}</span>
          {dueLabel ? (
            <span class={`due ${isPast(task.due) && !task.done ? 'past' : isToday(task.due) ? 'today' : ''}`}>
              {dueLabel}
            </span>
          ) : null}
        </div>
        {task.note ? <p class="note">{task.note}</p> : null}
        {task.tags.length ? (
          <ul class="tags">
            {task.tags.map((tagId) => {
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
      </div>
    </label>
  );
}
