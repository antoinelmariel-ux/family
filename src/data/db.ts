import { openDB, IDBPDatabase } from 'idb';
import type { Note, Task, GroceryItem, Store, Tag, ID } from './models';

const DB_NAME = 'codex';
const DB_VERSION = 1;

type DBSchema = {
  notes: Note;
  tasks: Task;
  groceries: GroceryItem;
  stores: Store;
  tags: Tag;
};

type StoreName = keyof DBSchema;

let dbPromise: Promise<IDBPDatabase<DBSchema>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        Object.keys({ notes: null, tasks: null, groceries: null, stores: null, tags: null }).forEach(
          (name) => {
            if (!db.objectStoreNames.contains(name)) {
              db.createObjectStore(name, { keyPath: 'id' });
            }
          }
        );
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta');
        }
      }
    });
  }
  return dbPromise;
}

export async function putItem<T extends StoreName>(store: T, value: DBSchema[T]) {
  const db = await getDB();
  await db.put(store, value);
  return value;
}

export async function putItems<T extends StoreName>(store: T, values: DBSchema[T][]) {
  const db = await getDB();
  const tx = db.transaction(store, 'readwrite');
  await Promise.all(values.map((value) => tx.store.put(value)));
  await tx.done;
  return values;
}

export async function deleteItem(store: StoreName, id: ID) {
  const db = await getDB();
  await db.delete(store, id);
}

export async function getAll<T extends StoreName>(store: T) {
  const db = await getDB();
  return db.getAll(store) as Promise<DBSchema[T][]>;
}

export async function getById<T extends StoreName>(store: T, id: ID) {
  const db = await getDB();
  return db.get(store, id) as Promise<DBSchema[T] | undefined>;
}

export async function clearStore(store: StoreName) {
  const db = await getDB();
  await db.clear(store);
}
