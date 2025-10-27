import { html } from '../lib/ui.js';
import { useEffect, useRef, useState } from '../lib/hooks.js';
import { addQuickItem } from '../data/store.js';
import { parseSmartInput } from '../utils/parser.js';

export default function SheetAdd({ onClose }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);
  const [preview, setPreview] = useState('note');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const parsed = parseSmartInput(value);
    setPreview(parsed.type);
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    await addQuickItem(value.trim());
    setValue('');
    onClose();
  };

  return html`
    <div class="sheet-add" role="dialog" aria-modal="true">
      <div class="sheet">
        <header>
          <div>
            <p class="hint">Création rapide</p>
            <h2>
              ${preview === 'task'
                ? 'Nouvelle tâche'
                : preview === 'grocery'
                  ? 'Article courses'
                  : 'Nouvelle note'}
            </h2>
          </div>
          <button type="button" onClick=${onClose} aria-label="Fermer" class="close">
            ×
          </button>
        </header>
        <form onSubmit=${handleSubmit}>
          <textarea
            ref=${textareaRef}
            value=${value}
            rows="4"
            placeholder="Tape - pour une tâche, #tag, !demain, @magasin"
            onInput=${(event) => setValue(event.currentTarget.value)}
          ></textarea>
          <div class="actions">
            <button type="submit" class="primary" disabled=${!value.trim()}>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
