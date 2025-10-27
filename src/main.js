import { render, Fragment, html } from './lib/ui.js';
import { useEffect } from './lib/hooks.js';
import AppShell from './components/app-shell.js';

const root = document.getElementById('app');

if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(new URL('./sw.js', import.meta.url), { type: 'module' })
      .catch((err) => console.error('SW registration failed', err));
  });
}

function ViewportFix() {
  useEffect(() => {
    const update = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return null;
}

function Root() {
  return html`<${Fragment}>
    <${ViewportFix} />
    <${AppShell} />
  </${Fragment}>`;
}

render(html`<${Root} />`, root);
