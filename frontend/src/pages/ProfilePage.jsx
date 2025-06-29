import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstagramAuthContext } from '../context/InstagramAuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { setToken } = useContext(InstagramAuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    setToken(null);
    navigate('/');
  };

  if (!profile) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="p-4 space-y-4 bg-white text-darkBg">
      <img
        src={`/api/avatars/${profile.avatar}`}
        alt="Avatar"
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Gemas encontradas</h2>
        <ul className="list-disc list-inside space-y-1">
          {profile.gemsFound.map((g) => (
            <li key={g}>{g.toLowerCase()}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Boosters</h2>
        <div className="space-x-2">
          {profile.boosters.map((b) => (
            <span
              key={b}
              className="inline-block bg-neonPink text-white px-2 py-1 rounded-full text-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-header font-semibold text-lg mb-2">Progreso</h2>
        <BarChart width={300} height={200} data={profile.playStats}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="levelsCompleted" fill="#F5DF4D" />
        </BarChart>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-neonPink text-white rounded font-header"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
