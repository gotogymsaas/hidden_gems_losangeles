import { useNavigate } from 'react-router-dom';

const avatars = [
  { name: 'foodie', label: 'Foodie' },
  { name: 'artista', label: 'Artista' },
  { name: 'surfista', label: 'Surfista' }
];

export default function AvatarSelector() {
  const navigate = useNavigate();

  const selectAvatar = (name) => {
    navigate(`/map?avatar=${name}`);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {avatars.map((a) => (
        <button
          key={a.name}
          onClick={() => selectAvatar(a.name)}
          className="rounded-lg overflow-hidden border-2 border-transparent hover:border-neonPink transform hover:scale-105 transition"
        >
          <img
            src={`/api/avatars/${a.name}`}
            alt={a.label}
            className="w-full h-40 object-cover"
          />
          <div className="p-2 text-center font-header">{a.label}</div>
        </button>
      ))}
    </div>
  );
}
