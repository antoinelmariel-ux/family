import type { Signal } from '@preact/signals';
import './search-bar.css';

type Props = {
  query: Signal<string>;
};

export default function SearchBar({ query }: Props) {
  return (
    <label class="search-bar">
      <span class="sr-only">Recherche</span>
      <input
        type="search"
        inputMode="search"
        value={query.value}
        placeholder="Recherche rapide"
        onInput={(event) => {
          const target = event.currentTarget as HTMLInputElement;
          query.value = target.value;
        }}
      />
    </label>
  );
}
