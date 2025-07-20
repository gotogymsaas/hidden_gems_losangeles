import { useState } from 'react';
import ConsentBanner from '../components/ConsentBanner';

const heroImages = [1, 2, 3];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % heroImages.length);
  const prev = () => setIndex((index - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="bg-white text-darkBg font-body">
      <ConsentBanner />
      <section className="w-full h-60 md:h-80 bg-skyBlue flex items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-header font-bold text-white text-center px-4">
          Descubre LA’s best kept secrets
        </h1>
      </section>

      <section className="py-6 flex items-center justify-center space-x-4">
        <button onClick={prev} className="text-skyBlue text-2xl font-bold">
          &#8249;
        </button>
        <img
          src={`/api/images/hero${heroImages[index]}`}
          alt="Gem"
          className="w-full max-w-md h-64 object-cover rounded"
        />
        <button onClick={next} className="text-skyBlue text-2xl font-bold">
          &#8250;
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="border border-skyBlue rounded p-4 text-center">
          <h2 className="font-header font-semibold text-lg mb-2">Comida</h2>
          <p>Sabores únicos y rincones gastronómicos.</p>
        </div>
        <div className="border border-skyBlue rounded p-4 text-center">
          <h2 className="font-header font-semibold text-lg mb-2">Cultura</h2>
          <p>Museos, arte callejero y más.</p>
        </div>
        <div className="border border-skyBlue rounded p-4 text-center">
          <h2 className="font-header font-semibold text-lg mb-2">Eventos</h2>
          <p>No te pierdas lo que está pasando.</p>
        </div>
      </section>

      <div className="text-center pb-8">
        <a href="/policies" className="underline text-skyBlue">
          Ver Políticas
        </a>
      </div>
    </div>
  );
}
