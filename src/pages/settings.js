import { html } from '../lib/ui.js';

export default function SettingsPage() {
  return html`
    <section>
      <h2>Réglages</h2>
      <ul>
        <li>Thème clair/sombre automatique</li>
        <li>Export JSON & Markdown (à venir)</li>
        <li>Templates personnalisés</li>
      </ul>
    </section>
  `;
}
