import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvatarSelector from './pages/AvatarSelector';
import MapPage from './pages/MapPage';
import GameBoard from './pages/GameBoard';
import GemDetail from './pages/GemDetail';
import ProfilePage from './pages/ProfilePage';
import PoliciesPage from './pages/PoliciesPage';
import DSARFormPage from './pages/DSARFormPage';
import Layout from './components/Layout';
import { InstagramAuthProvider } from './context/InstagramAuthContext';
import './App.css';

export default function App() {
  return (
    <InstagramAuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/dsar" element={<DSARFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/avatar" element={<AvatarSelector />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/play/:zone/:level" element={<GameBoard />} />
            <Route path="/gem/:id" element={<GemDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </InstagramAuthProvider>
  );
}
