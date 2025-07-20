import { useEffect, useState } from 'react';

const statuses = ['pending', 'in-progress', 'done'];

export default function AdminDashboard() {
  const [consents, setConsents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetch('/api/consent')
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) setForbidden(true);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setConsents(Array.isArray(data) ? data : []);
      })
      .catch(() => {});

    fetch('/api/dsar')
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) setForbidden(true);
          return [];
        }
        return res.json();
      })
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const updateStatus = (id, status) => {
    fetch(`/api/dsar/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then((res) => res.json())
      .then((updated) => {
        setRequests((prev) =>
          prev.map((r) => (r._id === updated._id ? updated : r))
        );
      })
      .catch(() => {});
  };

  if (forbidden) {
    return <div className="p-4">Acceso denegado</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Consentimientos</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Usuario</th>
              <th className="border px-2 py-1">Necesarias</th>
              <th className="border px-2 py-1">Analytics</th>
              <th className="border px-2 py-1">Marketing</th>
              <th className="border px-2 py-1">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {consents.map((c) => (
              <tr key={c._id}>
                <td className="border px-2 py-1">{c.userId}</td>
                <td className="border px-2 py-1 text-center">
                  {c.categories?.necessary ? '✔' : ''}
                </td>
                <td className="border px-2 py-1 text-center">
                  {c.categories?.analytics ? '✔' : ''}
                </td>
                <td className="border px-2 py-1 text-center">
                  {c.categories?.marketing ? '✔' : ''}
                </td>
                <td className="border px-2 py-1">
                  {new Date(c.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Solicitudes DSAR</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Tipo</th>
              <th className="border px-2 py-1">Detalles</th>
              <th className="border px-2 py-1">Estado</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border px-2 py-1">{req.userEmail}</td>
                <td className="border px-2 py-1">{req.type}</td>
                <td className="border px-2 py-1">{req.details}</td>
                <td className="border px-2 py-1">
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
