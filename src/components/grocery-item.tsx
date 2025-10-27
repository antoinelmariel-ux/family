import type { GroceryItem } from '../data/models';
import { toggleGrocery } from '../data/store';
import './grocery-item.css';

type Props = {
  item: GroceryItem;
};

export default function GroceryItemRow({ item }: Props) {
  return (
    <label class={`grocery-item ${item.checked ? 'checked' : ''}`}>
      <input type="checkbox" checked={item.checked} onChange={() => toggleGrocery(item.id)} />
      <div class="info">
        <span class="name">{item.name}</span>
        {item.qty ? <span class="meta">{item.qty}</span> : null}
        {item.category ? <span class="meta cat">{item.category}</span> : null}
      </div>
    </label>
  );
}
