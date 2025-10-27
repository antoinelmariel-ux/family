import { signal, computed } from '@preact/signals';
import { getAll, putItem, putItems, deleteItem } from './db';
import type { GroceryItem, Note, Store as StoreModel, Tag, Task } from './models';
import { seedGroceries, seedNotes, seedStores, seedTags, seedTasks } from './seed';
import { nanoid } from '../utils/id';
import { guessCategory } from '../utils/categorize';

const notes = signal<Note[]>([]);
const tasks = signal<Task[]>([]);
const groceries = signal<GroceryItem[]>([]);
const stores = signal<StoreModel[]>([]);
const tags = signal<Tag[]>([]);
const ready = signal(false);

export const searchQuery = signal('');
export const activeTab = signal<'home' | 'notes' | 'tasks' | 'groceries'>('home');
export const version = `v${import.meta.env.VITE_APP_VERSION ?? '0.1.1'}`;

export const todayTasks = computed(() =>
  tasks.value.filter((task) => {
    if (!task.due || task.done) return false;
    const todayISO = new Date().toISOString().split('T')[0];
    return task.due <= todayISO;
  })
);

export const recentNotes = computed(() =>
  [...notes.value]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5)
);

export const activeStore = signal<string | null>(null);

export async function bootstrap() {
  const [storedNotes, storedTasks, storedGroceries, storedStores, storedTags] = await Promise.all([
    getAll('notes'),
    getAll('tasks'),
    getAll('groceries'),
    getAll('stores'),
    getAll('tags')
  ]);

  if (!storedTags.length) {
    const seededTags = seedTags();
    await putItems('tags', seededTags);
    tags.value = seededTags;
  } else {
    tags.value = storedTags;
  }

  if (!storedStores.length) {
    const seededStores = seedStores();
    await putItems('stores', seededStores);
    stores.value = seededStores;
  } else {
    stores.value = storedStores;
  }

  if (!storedNotes.length) {
    const seededNotes = seedNotes();
    await putItems('notes', seededNotes);
    notes.value = seededNotes;
  } else {
    notes.value = storedNotes;
  }

  if (!storedTasks.length) {
    const seededTasks = seedTasks(tags.value);
    await putItems('tasks', seededTasks);
    tasks.value = seededTasks;
  } else {
    tasks.value = storedTasks;
  }

  if (!storedGroceries.length) {
    const firstStore = stores.value[0];
    if (firstStore) {
      const seededGroceries = seedGroceries(firstStore);
      await putItems('groceries', seededGroceries);
      groceries.value = seededGroceries;
    }
  } else {
    groceries.value = storedGroceries;
  }

  if (!activeStore.value && stores.value.length) {
    activeStore.value = stores.value[0].id;
  }

  ready.value = true;
}

export function isReady() {
  return ready.value;
}

export function getNotes() {
  return notes;
}

export function getTasks() {
  return tasks;
}

export function getGroceries() {
  return groceries;
}

export function getStores() {
  return stores;
}

export function getTags() {
  return tags;
}

export async function toggleTask(taskId: string) {
  const task = tasks.value.find((t) => t.id === taskId);
  if (!task) return;
  const updated = { ...task, done: !task.done, updatedAt: Date.now() };
  tasks.value = tasks.value.map((t) => (t.id === taskId ? updated : t));
  await putItem('tasks', updated);
}

export async function toggleGrocery(groceryId: string) {
  const item = groceries.value.find((g) => g.id === groceryId);
  if (!item) return;
  const updated = { ...item, checked: !item.checked };
  groceries.value = groceries.value.map((g) => (g.id === groceryId ? updated : g));
  await putItem('groceries', updated);
}

export async function addQuickItem(raw: string) {
  const now = Date.now();
  const lines = raw.split('\n');
  const title = lines[0] ?? 'Nouvel élément';
  const firstChar = title.trim().charAt(0);

  if (firstChar === '-') {
    const task = {
      id: nanoid(),
      title: title.replace(/^[-*]\s*/, ''),
      tags: [],
      done: false,
      createdAt: now,
      updatedAt: now
    } as Task;
    tasks.value = [task, ...tasks.value];
    await putItem('tasks', task);
    return { type: 'task', id: task.id } as const;
  }

  if (raw.includes('@')) {
    const item: GroceryItem = {
      id: nanoid(),
      name: title.replace(/^[-*]\s*/, ''),
      checked: false,
      category: guessCategory(title),
      storeId: activeStore.value ?? stores.value[0]?.id,
      lastBoughtAt: now
    };
    groceries.value = [item, ...groceries.value];
    await putItem('groceries', item);
    return { type: 'grocery', id: item.id } as const;
  }

  const note: Note = {
    id: nanoid(),
    title,
    contentMD: raw,
    tags: [],
    createdAt: now,
    updatedAt: now
  };
  notes.value = [note, ...notes.value];
  await putItem('notes', note);
  return { type: 'note', id: note.id } as const;
}

export async function saveNote(note: Note) {
  notes.value = notes.value.map((n) => (n.id === note.id ? note : n));
  await putItem('notes', note);
}

export async function saveTask(task: Task) {
  tasks.value = tasks.value.map((t) => (t.id === task.id ? task : t));
  await putItem('tasks', task);
}

export async function saveGrocery(item: GroceryItem) {
  groceries.value = groceries.value.map((g) => (g.id === item.id ? item : g));
  await putItem('groceries', item);
}

export async function removeNote(id: string) {
  notes.value = notes.value.filter((n) => n.id !== id);
  await deleteItem('notes', id);
}

export async function removeTask(id: string) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  await deleteItem('tasks', id);
}

export async function removeGrocery(id: string) {
  groceries.value = groceries.value.filter((g) => g.id !== id);
  await deleteItem('groceries', id);
}
