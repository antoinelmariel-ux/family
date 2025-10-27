import { activeTab } from '../data/store';
import './tabbar.css';

const tabs = [
  { key: 'home', label: 'Accueil', icon: 'house' },
  { key: 'notes', label: 'Notes', icon: 'doc' },
  { key: 'tasks', label: 'Tâches', icon: 'checklist' },
  { key: 'groceries', label: 'Courses', icon: 'cart' }
] as const;

type TabKey = (typeof tabs)[number]['key'];

type Props = {
  onAdd: () => void;
};

const icons: Record<string, string> = {
  house: 'M4 12l6-6 6 6',
  doc: 'M6 4h6l4 4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  checklist: 'M5 7h6M5 12h6m4-3 2 2 4-4m0 7-4 4-2-2',
  cart: 'M4 6h2l1 7h9l1.2-5H7'
};

export default function TabBar({ onAdd }: Props) {
  return (
    <nav class="tabbar" aria-label="Navigation principale">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          class={`tab ${activeTab.value === tab.key ? 'active' : ''}`}
          onClick={() => {
            activeTab.value = tab.key as TabKey;
          }}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={icons[tab.icon]} fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{tab.label}</span>
        </button>
      ))}
      <button class="fab" onClick={onAdd} type="button" aria-label="Ajouter">
        <span>+</span>
      </button>
    </nav>
  );
}
