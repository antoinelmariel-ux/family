export type ID = string;

export type Tag = { id: ID; name: string; color?: string };

export type Note = {
  id: ID;
  title: string;
  contentMD: string;
  tags: ID[];
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
};

export type Task = {
  id: ID;
  title: string;
  note?: string;
  due?: string;
  priority?: 1 | 2 | 3;
  tags: ID[];
  project?: string;
  subtasks?: { id: ID; title: string; done: boolean }[];
  done: boolean;
  createdAt: number;
  updatedAt: number;
};

export type GroceryItem = {
  id: ID;
  name: string;
  qty?: string;
  note?: string;
  category?: string;
  storeId?: ID;
  checked: boolean;
  lastBoughtAt?: number;
};

export type Store = { id: ID; name: string; aisleOrder: string[] };

export type ShareLink = {
  id: ID;
  type: 'tasks' | 'groceries';
  targetId: ID;
  role: 'view' | 'edit';
};

export type ItemType = 'note' | 'task' | 'grocery';
