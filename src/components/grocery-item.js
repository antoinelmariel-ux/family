import { html } from '../lib/ui.js';
import { toggleGrocery } from '../data/store.js';

export default function GroceryItemRow({ item }) {
  return html`
    <label class="grocery-item ${item.checked ? 'checked' : ''}">
      <input type="checkbox" checked=${item.checked} onChange=${() => toggleGrocery(item.id)} />
      <div class="info">
        <span class="name">${item.name}</span>
        ${item.qty ? html`<span class="meta">${item.qty}</span>` : null}
        ${item.category ? html`<span class="meta cat">${item.category}</span>` : null}
      </div>
    </label>
  `;
}
