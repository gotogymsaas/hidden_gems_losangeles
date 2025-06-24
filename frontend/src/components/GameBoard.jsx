import React, { useEffect, useState } from 'react';
import { getLevelConfig, postLevelResult } from '../api/levels';

const GameBoard = ({ levelId, userId }) => {
  const [config, setConfig] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getLevelConfig(levelId)
      .then(setConfig)
      .catch((err) => console.error(err));
  }, [levelId]);

  const handleComplete = async (score) => {
    try {
      await postLevelResult({ levelId, score, userId });
      setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!config) return <div>Loading...</div>;

  return (
    <div>
      {/* Render game board based on config here */}
      {completed ? (
        <div>Level Completed!</div>
      ) : (
        <button onClick={() => handleComplete(100)}>Complete Level</button>
      )}
    </div>
  );
};

export default GameBoard;
