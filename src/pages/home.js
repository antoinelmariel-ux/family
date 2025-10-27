import { html } from '../lib/ui.js';
import { todayTasks, recentNotes, getGroceries, activeStore, getStores, getTags } from '../data/store.js';
import TaskItem from '../components/task-item.js';
import NoteCard from '../components/note-card.js';
import GroceryItemRow from '../components/grocery-item.js';

export default function HomePage() {
  const tasks = todayTasks.value.slice(0, 3);
  const notes = recentNotes.value.slice(0, 3);
  const tags = getTags().value;
  const groceries = getGroceries().value.filter((item) => item.storeId === activeStore.value).slice(0, 4);
  const store = getStores().value.find((s) => s.id === activeStore.value);

  const openNote = (id) => {
    console.info('Open note', id);
    alert('Édition de note bientôt disponible.');
  };

  return html`
    <section class="home">
      <div class="widget">
        <header>
          <h2>À faire aujourd'hui</h2>
        </header>
        ${tasks.length
          ? tasks.map((task) => html`<${TaskItem} key=${task.id} task=${task} tags=${tags} />`)
          : html`<p class="empty">Rien pour aujourd'hui.</p>`}
      </div>
      <div class="widget">
        <header>
          <h2>Dernières notes</h2>
        </header>
        ${notes.length
          ? notes.map((note) => html`<${NoteCard} key=${note.id} note=${note} tags=${tags} onOpen=${openNote} />`)
          : html`<p class="empty">Capture ta première note.</p>`}
      </div>
      <div class="widget">
        <header>
          <h2>${store ? `Courses ${store.name}` : 'Courses'}</h2>
        </header>
        ${groceries.length
          ? groceries.map((item) => html`<${GroceryItemRow} key=${item.id} item=${item} />`)
          : html`<p class="empty">Ta liste est vide.</p>`}
      </div>
    </section>
  `;
}
