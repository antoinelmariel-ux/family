import { signal, computed } from '../lib/signals.js';
import { getAll, putItem, putItems, deleteItem } from './db.js';
import { seedGroceries, seedNotes, seedStores, seedTags, seedTasks } from './seed.js';
import { nanoid } from '../utils/id.js';
import { guessCategory } from '../utils/categorize.js';

const notes = signal([]);
const tasks = signal([]);
const groceries = signal([]);
const stores = signal([]);
const tags = signal([]);
const ready = signal(false);

export const searchQuery = signal('');
export const activeTab = signal('home');

const fallbackVersion = '0.1.3';
const versionSource = typeof window !== 'undefined' && window.APP_VERSION ? window.APP_VERSION : fallbackVersion;
export const version = `v${versionSource}`;

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

export const activeStore = signal(null);

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
  return ready;
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

export async function toggleTask(taskId) {
  const task = tasks.value.find((t) => t.id === taskId);
  if (!task) return;
  const updated = { ...task, done: !task.done, updatedAt: Date.now() };
  tasks.value = tasks.value.map((t) => (t.id === taskId ? updated : t));
  await putItem('tasks', updated);
}

export async function toggleGrocery(groceryId) {
  const item = groceries.value.find((g) => g.id === groceryId);
  if (!item) return;
  const updated = { ...item, checked: !item.checked };
  groceries.value = groceries.value.map((g) => (g.id === groceryId ? updated : g));
  await putItem('groceries', updated);
}

export async function addQuickItem(raw) {
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
    };
    tasks.value = [task, ...tasks.value];
    await putItem('tasks', task);
    return { type: 'task', id: task.id };
  }

  if (raw.includes('@')) {
    const item = {
      id: nanoid(),
      name: title.replace(/^[-*]\s*/, ''),
      checked: false,
      category: guessCategory(title),
      storeId: activeStore.value ?? (stores.value[0] ? stores.value[0].id : undefined),
      lastBoughtAt: now
    };
    groceries.value = [item, ...groceries.value];
    await putItem('groceries', item);
    return { type: 'grocery', id: item.id };
  }

  const note = {
    id: nanoid(),
    title,
    contentMD: raw,
    tags: [],
    createdAt: now,
    updatedAt: now
  };
  notes.value = [note, ...notes.value];
  await putItem('notes', note);
  return { type: 'note', id: note.id };
}

export async function saveNote(note) {
  notes.value = notes.value.map((n) => (n.id === note.id ? note : n));
  await putItem('notes', note);
}

export async function saveTask(task) {
  tasks.value = tasks.value.map((t) => (t.id === task.id ? task : t));
  await putItem('tasks', task);
}

export async function saveGrocery(item) {
  groceries.value = groceries.value.map((g) => (g.id === item.id ? item : g));
  await putItem('groceries', item);
}

export async function removeNote(id) {
  notes.value = notes.value.filter((n) => n.id !== id);
  await deleteItem('notes', id);
}
