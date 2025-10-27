import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import AppShell from './components/app-shell';
import './styles/tokens.css';

const root = document.getElementById('app');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(new URL('./sw.ts', import.meta.url), { type: 'module' })
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

render(
  <>
    <ViewportFix />
    <AppShell />
  </>,
  root as HTMLElement
);
