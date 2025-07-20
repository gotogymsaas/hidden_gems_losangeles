import { useEffect, useState } from 'react';

const regions = ['CA', 'COL'];
const langs = ['en', 'es'];

export default function PoliciesPage() {
  const [region, setRegion] = useState('CA');
  const [lang, setLang] = useState('en');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/policies?region=${region}&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setContent(data.content))
      .catch(() => setContent(''));
  }, [region, lang]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-3 py-1 border rounded ${region === r ? 'bg-solarYellow' : ''}`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 border rounded ${lang === l ? 'bg-solarYellow' : ''}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <pre className="whitespace-pre-wrap">{content || 'Cargando...'}</pre>
    </div>
  );
}
