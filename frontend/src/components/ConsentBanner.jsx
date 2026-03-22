import { useState } from 'react';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!visible) return null;

  const save = () => {
    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: { necessary: true, analytics, marketing }
      })
    }).catch(() => {});
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 bg-darkBg text-white p-4 space-y-2 text-center">
      <p>
        Usamos cookies para mejorar tu experiencia{' '}
        <a href="/policies" className="underline">
          Ver Políticas
        </a>
      </p>
      <div className="flex justify-center space-x-4">
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked disabled />
          <span>Necesarias</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <span>Analytics</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <span>Marketing</span>
        </label>
      </div>
      <button
        onClick={save}
        className="px-4 py-2 bg-solarYellow text-darkBg rounded font-header"
      >
        Guardar preferencias
      </button>
    </div>
  );
}
