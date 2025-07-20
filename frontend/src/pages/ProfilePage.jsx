import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(null);
  const [requests, setRequests] = useState([]);

  const fetchData = () => {
    if (email) {
      fetch(`/api/dsar?userEmail=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then(setRequests)
        .catch(() => setRequests([]));
    }
    fetch('/api/consent')
      .then((res) => res.json())
      .then(setConsent)
      .catch(() => setConsent(null));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-solarYellow text-darkBg rounded font-header"
        >
          Cargar datos
        </button>
      </div>

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Consentimiento</h2>
        {consent ? (
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(consent.categories, null, 2)}
          </pre>
        ) : (
          'Sin datos'
        )}
      </div>

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Historial DSAR</h2>
        <ul className="list-disc list-inside space-y-1">
          {requests.map((r) => (
            <li key={r._id}>
              {r.type} - {r.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
