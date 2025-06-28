import { useState, useEffect, useContext } from 'react';
import { InstagramAuthContext } from '../context/InstagramAuthContext';

export default function Header() {
  const { setToken } = useContext(InstagramAuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setToken(token);
      const url = new URL(window.location);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url);
    }
  }, [setToken]);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  const handleLogin = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = window.location.origin;
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    window.location.href = authUrl;
  };

  return (
    <header className="flex items-center justify-between p-4 bg-darkBg text-white">
      <div className="font-header font-black text-solarYellow text-xl">
        Hidden Gems LA
      </div>
      <nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-4`}
      >
        <a href="/play/downtown/1" className="block px-3 py-2 hover:text-solarYellow">
          Jugar
        </a>
        <button
          onClick={handleInstall}
          className="block px-3 py-2 hover:text-solarYellow"
        >
          Instalar App
        </button>
        <button
          onClick={handleLogin}
          className="block px-3 py-2 hover:text-solarYellow"
        >
          Login con Instagram
        </button>
      </nav>
      <button
        className="md:hidden text-solarYellow text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
    </header>
  );
}
