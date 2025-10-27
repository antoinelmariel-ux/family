import { useEffect, useState } from 'preact/hooks';
import { Signal, useSignalEffect } from '@preact/signals';
import { activeTab, bootstrap, isReady, searchQuery, version } from '../data/store';
import TabBar from './tabbar';
import SearchBar from './search-bar';
import SheetAdd from './sheet-add';
import './app-shell.css';
import HomePage from '../pages/home';
import NotesPage from '../pages/notes';
import TasksPage from '../pages/tasks';
import GroceriesPage from '../pages/groceries';

const routeMap = {
  home: HomePage,
  notes: NotesPage,
  tasks: TasksPage,
  groceries: GroceriesPage
} as const;

type RouteKey = keyof typeof routeMap;

function useHashRoute(signal: Signal<RouteKey>) {
  useEffect(() => {
    const update = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash in routeMap) {
        signal.value = hash as RouteKey;
      }
    };
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [signal]);

  useSignalEffect(() => {
    const current = signal.value;
    if (window.location.hash.replace('#', '') !== current) {
      window.location.hash = current;
    }
  });
}

export default function AppShell() {
  const [showSheet, setShowSheet] = useState(false);
  const ready = isReady();

  useEffect(() => {
    bootstrap();
  }, []);

  useHashRoute(activeTab as Signal<RouteKey>);

  const ActivePage = routeMap[activeTab.value];

  return (
    <div class="app-shell">
      <header class="app-header">
        <div class="title">
          <h1>Codex</h1>
          <p>Notes • Tâches • Courses</p>
        </div>
        <SearchBar query={searchQuery} />
      </header>
      <main class="app-content" aria-live="polite">
        {!ready ? <p class="loading">Chargement…</p> : <ActivePage />}
      </main>
      <footer class="app-footer">
        <small>Codex {version}</small>
      </footer>
      <TabBar onAdd={() => setShowSheet(true)} />
      {showSheet ? <SheetAdd onClose={() => setShowSheet(false)} /> : null}
    </div>
  );
}
