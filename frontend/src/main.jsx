import React from 'react';
import ReactDOM from 'react-dom/client';
import GameBoard from './components/GameBoard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameBoard levelId={1} userId={1} />
  </React.StrictMode>
);
