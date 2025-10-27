import { html } from '../lib/ui.js';
import { useEffect, useState } from '../lib/hooks.js';
import { useSignalEffect } from '../lib/signals.js';
import { activeTab, bootstrap, isReady, searchQuery, version } from '../data/store.js';
import TabBar from './tabbar.js';
import SearchBar from './search-bar.js';
import SheetAdd from './sheet-add.js';
import HomePage from '../pages/home.js';
import NotesPage from '../pages/notes.js';
import TasksPage from '../pages/tasks.js';
import GroceriesPage from '../pages/groceries.js';

const routeMap = {
  home: HomePage,
  notes: NotesPage,
  tasks: TasksPage,
  groceries: GroceriesPage
};

function useHashRoute(signal) {
  useEffect(() => {
    const update = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && routeMap[hash]) {
        signal.value = hash;
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

  useHashRoute(activeTab);

  const ActivePage = routeMap[activeTab.value];

  return html`
    <div class="app-shell">
      <header class="app-header">
        <div class="title">
          <h1>Codex</h1>
          <p>Notes • Tâches • Courses</p>
        </div>
        <${SearchBar} query=${searchQuery} />
      </header>
      <main class="app-content" aria-live="polite">
        ${!ready ? html`<p class="loading">Chargement…</p>` : html`<${ActivePage} />`}
      </main>
      <footer class="app-footer">
        <small>Codex ${version}</small>
      </footer>
      <${TabBar} onAdd=${() => setShowSheet(true)} />
      ${showSheet ? html`<${SheetAdd} onClose=${() => setShowSheet(false)} />` : null}
    </div>
  `;
}
