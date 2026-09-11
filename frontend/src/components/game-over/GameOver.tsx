import {
  useGameContext,
} from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";
import { useScore } from "../../foundation/shared/hooks/use-score";

type GameOverProps = {
  onPlayAgain: () => void;
};

function GameOver({ onPlayAgain }: GameOverProps) {
  const {
    state: { status },
  } = useGameContext();

  const score = useScore();

  if (status !== GameStatus.FINISHED) {
    return null;
  }

  return (
    <div className="blockforge-game-over">
      <div className="blockforge-game-over-backdrop" />

      <div className="blockforge-game-over-card">
        <p className="blockforge-game-over-label">GAME OVER</p>

        <h2>{score}</h2>

        <p className="blockforge-game-over-score-label">
          FINAL SCORE
        </p>

        <button
          type="button"
          onClick={onPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default GameOver;