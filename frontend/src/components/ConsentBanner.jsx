import { useState } from 'react';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const accept = () => {
    setVisible(false);
    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: { necessary: true, analytics: false, marketing: false }
      })
    }).catch(() => {});
  };

  return (
    <div className="fixed bottom-0 inset-x-0 bg-darkBg text-white p-4 space-y-2 text-center">
      <p>
        Usamos cookies para mejorar tu experiencia.{' '}
        <a href="/policies" className="underline">
          Ver Políticas
        </a>
      </p>
      <button
        onClick={accept}
        className="px-4 py-2 bg-solarYellow text-darkBg rounded font-header"
      >
        Aceptar
      </button>
    </div>
  );
}
