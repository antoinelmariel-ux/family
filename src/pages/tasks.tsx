import { useState } from 'preact/hooks';
import TaskItem from '../components/task-item';
import { getTasks, getTags } from '../data/store';
import './tasks.css';

const filters = ['Aujourd’hui', 'À venir', 'Toutes'];

export default function TasksPage() {
  const [filter, setFilter] = useState('Aujourd’hui');
  const tasks = getTasks().value;
  const tags = getTags().value;

  const todayISO = new Date().toISOString().split('T')[0];
  const filtered = tasks.filter((task) => {
    if (filter === 'Aujourd’hui') {
      return task.due === todayISO && !task.done;
    }
    if (filter === 'À venir') {
      return task.due && task.due > todayISO && !task.done;
    }
    return true;
  });

  return (
    <section class="tasks">
      <div class="chips">
        {filters.map((name) => (
          <button key={name} class={filter === name ? 'active' : ''} onClick={() => setFilter(name)}>
            {name}
          </button>
        ))}
      </div>
      <div>
        {filtered.length ? (
          filtered.map((task) => <TaskItem key={task.id} task={task} tags={tags} />)
        ) : (
          <p class="empty">Aucune tâche dans cette vue.</p>
        )}
      </div>
    </section>
  );
}
