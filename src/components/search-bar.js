import { html } from '../lib/ui.js';
import { useSignalValue } from '../lib/signals.js';

export default function SearchBar({ query }) {
  const value = useSignalValue(query);

  return html`
    <label class="search-bar">
      <span class="sr-only">Recherche</span>
      <input
        type="search"
        inputmode="search"
        value=${value}
        placeholder="Recherche rapide"
        onInput=${(event) => {
          query.value = event.currentTarget.value;
        }}
      />
    </label>
  `;
}
