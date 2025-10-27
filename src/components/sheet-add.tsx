import { useEffect, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { addQuickItem } from '../data/store';
import { parseSmartInput } from '../utils/parser';
import './sheet-add.css';

type Props = {
  onClose: () => void;
};

export default function SheetAdd({ onClose }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState('note');

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const parsed = parseSmartInput(value);
    setPreview(parsed.type);
  }, [value]);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    await addQuickItem(value.trim());
    setValue('');
    onClose();
  };

  return (
    <div class="sheet-add" role="dialog" aria-modal="true">
      <div class="sheet">
        <header>
          <div>
            <p class="hint">Création rapide</p>
            <h2>{preview === 'task' ? 'Nouvelle tâche' : preview === 'grocery' ? 'Article courses' : 'Nouvelle note'}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" class="close">
            ×
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={value}
            rows={4}
            placeholder="Tape - pour une tâche, #tag, !demain, @magasin"
            onInput={(event) => setValue((event.currentTarget as HTMLTextAreaElement).value)}
          />
          <div class="actions">
            <button type="submit" class="primary" disabled={!value.trim()}>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
