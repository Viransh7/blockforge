import {
  useGameCallbacks,
  useGameContext,
  useOnPlay,
} from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";
import { useScore } from "../../foundation/shared/hooks/use-score";

function GameOver() {
  const {
    state: { status },
  } = useGameContext();

  const score = useScore();
  const onPlay = useOnPlay();
  const { onFinishedCountdown } = useGameCallbacks();

  if (status !== GameStatus.FINISHED) {
    return null;
  }

  return (
    <div className="blockforge-game-over">
      <div className="blockforge-game-over-card">
        <p className="blockforge-game-over-label">GAME OVER</p>

        <h2>{score}</h2>

        <p className="blockforge-game-over-score-label">FINAL SCORE</p>

        <button
          type="button"
          onClick={() => {
            onPlay();
            onFinishedCountdown?.();
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default GameOver;