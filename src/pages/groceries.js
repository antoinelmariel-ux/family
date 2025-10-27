import { html } from '../lib/ui.js';
import { getGroceries, getStores, activeStore } from '../data/store.js';
import { useSignalValue } from '../lib/signals.js';
import GroceryItemRow from '../components/grocery-item.js';

export default function GroceriesPage() {
  const stores = useSignalValue(getStores());
  const selectedStore = useSignalValue(activeStore);
  const items = useSignalValue(getGroceries()).filter(
    (item) => !selectedStore || item.storeId === selectedStore
  );
  const grouped = items.reduce((acc, item) => {
    const key = item.category ?? 'Divers';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return html`
    <section class="groceries">
      <label class="store-select">
        <span>Magasin</span>
        <select
          value=${selectedStore ?? ''}
          onChange=${(event) => {
            const value = event.currentTarget.value;
            activeStore.value = value || null;
          }}
        >
          ${stores.map(
            (store) => html`
              <option key=${store.id} value=${store.id}>
                ${store.name}
              </option>
            `
          )}
        </select>
      </label>
      <div class="list">
        ${Object.entries(grouped).map(
          ([category, list]) => html`
            <section key=${category} class="category">
              <h3>${category}</h3>
              ${list.map((item) => html`<${GroceryItemRow} key=${item.id} item=${item} />`)}
            </section>
          `
        )}
        ${!items.length ? html`<p class="empty">Ajoute ton premier article avec @magasin.</p>` : null}
      </div>
    </section>
  `;
}
