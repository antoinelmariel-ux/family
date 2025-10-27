import { todayTasks, recentNotes, getGroceries, activeStore, getStores } from '../data/store';
import TaskItem from '../components/task-item';
import NoteCard from '../components/note-card';
import GroceryItemRow from '../components/grocery-item';
import { getTags } from '../data/store';
import './home.css';

export default function HomePage() {
  const tasks = todayTasks.value.slice(0, 3);
  const notes = recentNotes.value.slice(0, 3);
  const tags = getTags().value;
  const groceries = getGroceries().value.filter((item) => item.storeId === activeStore.value).slice(0, 4);
  const store = getStores().value.find((s) => s.id === activeStore.value);

  const openNote = (id: string) => {
    console.info('Open note', id);
    alert('Édition de note bientôt disponible.');
  };

  return (
    <section class="home">
      <div class="widget">
        <header>
          <h2>À faire aujourd'hui</h2>
        </header>
        {tasks.length ? tasks.map((task) => <TaskItem key={task.id} task={task} tags={tags} />) : <p class="empty">Rien pour aujourd'hui.</p>}
      </div>
      <div class="widget">
        <header>
          <h2>Dernières notes</h2>
        </header>
        {notes.length ? (
          notes.map((note) => <NoteCard key={note.id} note={note} tags={tags} onOpen={openNote} />)
        ) : (
          <p class="empty">Capture ta première note.</p>
        )}
      </div>
      <div class="widget">
        <header>
          <h2>{store ? `Courses ${store.name}` : 'Courses'}</h2>
        </header>
        {groceries.length ? groceries.map((item) => <GroceryItemRow key={item.id} item={item} />) : <p class="empty">Ta liste est vide.</p>}
      </div>
    </section>
  );
}
