import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GemDetail() {
  const { id } = useParams();
  const [gem, setGem] = useState(null);
  const avatar =
    new URLSearchParams(window.location.search).get('avatar') || 'foodie';

  useEffect(() => {
    fetch(`/api/gems/${id}`)
      .then((res) => res.json())
      .then((data) => setGem(data))
      .catch((err) => console.error(err));
  }, [id]);

  const shareStory = async () => {
    if (!gem) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    const bg = new Image();
    const av = new Image();
    bg.crossOrigin = 'anonymous';
    av.crossOrigin = 'anonymous';
    bg.src = gem.imageUrl;
    av.src = `/api/avatars/${avatar}`;

    await Promise.all([bg.decode(), av.decode()]);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    const size = 300;
    ctx.drawImage(av, canvas.width - size - 40, canvas.height - size - 40, size, size);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'story.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: gem.title, text: gem.description });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'story.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  if (!gem) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="p-4 space-y-4 bg-white text-darkBg">
      <img
        src={gem.imageUrl}
        alt={gem.title}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-header font-bold">{gem.title}</h1>
      <p className="font-body whitespace-pre-line">{gem.description}</p>
      <button
        onClick={shareStory}
        className="px-4 py-2 bg-neonPink text-white rounded font-header"
      >
        Compartir en IG Story
      </button>
    </div>
  );
}
