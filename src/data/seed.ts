import { nanoid } from '../utils/id';
import type { Note, Task, GroceryItem, Store, Tag } from './models';

export function seedNotes(): Note[] {
  const now = Date.now();
  return [
    {
      id: nanoid(),
      title: 'Liste rapide',
      contentMD: '# Bienvenue\n- Capture tes notes\n- Swipe pour organiser',
      tags: [],
      createdAt: now,
      updatedAt: now,
      pinned: true
    }
  ];
}

export function seedTasks(tags: Tag[]): Task[] {
  const now = Date.now();
  const todayTag = tags.find((tag) => tag.name === 'Aujourd\'hui');
  return [
    {
      id: nanoid(),
      title: 'Tester Codex',
      note: 'Appuie sur **+** pour créer une tâche.',
      due: new Date().toISOString().split('T')[0],
      priority: 2,
      tags: todayTag ? [todayTag.id] : [],
      done: false,
      createdAt: now,
      updatedAt: now
    }
  ];
}

export function seedGroceries(store: Store): GroceryItem[] {
  const now = Date.now();
  return [
    {
      id: nanoid(),
      name: 'Tomates',
      qty: '4',
      category: 'Fruits & Légumes',
      storeId: store.id,
      checked: false,
      lastBoughtAt: now
    },
    {
      id: nanoid(),
      name: 'Lait d\'avoine',
      qty: '2L',
      category: 'Laitier',
      storeId: store.id,
      checked: false,
      lastBoughtAt: now
    }
  ];
}

export function seedStores(): Store[] {
  return [
    {
      id: nanoid(),
      name: 'Monoprix',
      aisleOrder: ['Entrée', 'Fruits & Légumes', 'Boucherie', 'Épicerie', 'Laitier', 'Caisse']
    }
  ];
}

export function seedTags(): Tag[] {
  return [
    { id: nanoid(), name: 'Aujourd\'hui', color: '#0A84FF' },
    { id: nanoid(), name: 'Courses', color: '#34C759' }
  ];
}
