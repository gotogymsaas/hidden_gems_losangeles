import { useState } from 'react';

const types = [
  { value: 'access', label: 'Acceso' },
  { value: 'rectify', label: 'Rectificaci\u00f3n' },
  { value: 'cancel', label: 'Cancelaci\u00f3n' },
  { value: 'oppose', label: 'Oposici\u00f3n' }
];

export default function DSARFormPage() {
  const [email, setEmail] = useState('');
  const [type, setType] = useState('access');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    fetch('/api/dsar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: email, type, details })
    })
      .then(() => setSent(true))
      .catch(() => {});
  };

  if (sent) {
    return <div className="p-4">Solicitud enviada.</div>;
  }

  return (
    <form onSubmit={submit} className="p-4 space-y-4 max-w-md mx-auto">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        {types.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Detalles"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-solarYellow text-darkBg rounded font-header"
      >
        Enviar
      </button>
    </form>
  );
}
