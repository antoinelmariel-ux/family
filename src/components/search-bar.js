import { html } from '../lib/ui.js';

export default function SearchBar({ query }) {
  return html`
    <label class="search-bar">
      <span class="sr-only">Recherche</span>
      <input
        type="search"
        inputmode="search"
        value=${query.value}
        placeholder="Recherche rapide"
        onInput=${(event) => {
          query.value = event.currentTarget.value;
        }}
      />
    </label>
  `;
}
