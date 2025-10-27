import { getGroceries, getStores, activeStore } from '../data/store';
import GroceryItemRow from '../components/grocery-item';
import './groceries.css';

export default function GroceriesPage() {
  const stores = getStores().value;
  const items = getGroceries().value.filter((item) => !activeStore.value || item.storeId === activeStore.value);
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.category ?? 'Divers';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section class="groceries">
      <label class="store-select">
        <span>Magasin</span>
        <select
          value={activeStore.value ?? ''}
          onChange={(event) => {
            const value = (event.currentTarget as HTMLSelectElement).value;
            activeStore.value = value || null;
          }}
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </label>
      <div class="list">
        {Object.entries(grouped).map(([category, list]) => (
          <section key={category} class="category">
            <h3>{category}</h3>
            {list.map((item) => (
              <GroceryItemRow key={item.id} item={item} />
            ))}
          </section>
        ))}
        {!items.length ? <p class="empty">Ajoute ton premier article avec @magasin.</p> : null}
      </div>
    </section>
  );
}
