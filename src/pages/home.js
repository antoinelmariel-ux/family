import { html } from '../lib/ui.js';
import { todayTasks, recentNotes, getGroceries, activeStore, getStores, getTags } from '../data/store.js';
import { useSignalValue } from '../lib/signals.js';
import TaskItem from '../components/task-item.js';
import NoteCard from '../components/note-card.js';
import GroceryItemRow from '../components/grocery-item.js';

export default function HomePage() {
  const tasks = useSignalValue(todayTasks).slice(0, 3);
  const notes = useSignalValue(recentNotes).slice(0, 3);
  const tags = useSignalValue(getTags());
  const groceriesList = useSignalValue(getGroceries());
  const currentStore = useSignalValue(activeStore);
  const stores = useSignalValue(getStores());
  const groceries = groceriesList
    .filter((item) => item.storeId === currentStore)
    .slice(0, 4);
  const store = stores.find((s) => s.id === currentStore);

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
