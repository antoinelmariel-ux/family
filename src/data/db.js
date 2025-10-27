import { openDB } from 'https://esm.sh/idb@7.1.1?target=es2019&dev=false';

const DB_NAME = 'codex';
const DB_VERSION = 1;
const STORE_NAMES = ['notes', 'tasks', 'groceries', 'stores', 'tags'];

let dbPromise = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        STORE_NAMES.forEach((name) => {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath: 'id' });
          }
        });
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta');
        }
      }
    });
  }
  return dbPromise;
}

export async function putItem(store, value) {
  const db = await getDB();
  await db.put(store, value);
  return value;
}

export async function putItems(store, values) {
  const db = await getDB();
  const tx = db.transaction(store, 'readwrite');
  await Promise.all(values.map((value) => tx.store.put(value)));
  await tx.done;
  return values;
}

export async function deleteItem(store, id) {
  const db = await getDB();
  await db.delete(store, id);
}

export async function getAll(store) {
  const db = await getDB();
  return db.getAll(store);
}

export async function getById(store, id) {
  const db = await getDB();
  return db.get(store, id);
}

export async function clearStore(store) {
  const db = await getDB();
  await db.clear(store);
}
