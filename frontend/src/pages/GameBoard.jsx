import { useParams } from 'react-router-dom';
import GameBoardComponent from '../components/GameBoard';

export default function GameBoard() {
  const { level } = useParams();
  return (
    <div className="flex justify-center p-4">
      <GameBoardComponent levelId={level || 1} />
    </div>
  );
}
