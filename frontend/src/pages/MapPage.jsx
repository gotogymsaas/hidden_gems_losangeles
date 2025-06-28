import { useNavigate } from 'react-router-dom';

export default function MapPage() {
  const navigate = useNavigate();

  const zones = [
    { name: 'Downtown', cx: 160, cy: 200 },
    { name: 'Santa Monica', cx: 60, cy: 240 },
    { name: 'Hollywood', cx: 130, cy: 140 }
  ];

  // Example logic: only Downtown is unlocked
  const unlockedZones = ['Downtown'];

  const handleClick = (zone) => {
    const param = zone.toLowerCase().replace(/\s+/g, '-');
    navigate(`/map?zone=${param}`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <svg viewBox="0 0 300 300" className="w-full max-w-md">
        {/* Base map placeholder */}
        <rect x="0" y="0" width="300" height="300" fill="#e5e5e5" />
        {zones.map(({ name, cx, cy }) => (
          <circle
            key={name}
            cx={cx}
            cy={cy}
            r="20"
            onClick={() => handleClick(name)}
            className="cursor-pointer"
            fill={unlockedZones.includes(name) ? '#F5DF4D' : '#bbb'}
          />
        ))}
      </svg>
      <p className="mt-4 text-sm text-center">
        Haz clic en una zona para explorar.
      </p>
    </div>
  );
}
