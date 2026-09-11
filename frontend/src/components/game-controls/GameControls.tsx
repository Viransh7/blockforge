import {
  useGameCallbacks,
  useGameContext,
} from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";

type GameControlsProps = {
  onNewGame: () => void;
  onResume: () => void;
};

function GameControls({
  onNewGame,
  onResume,
}: GameControlsProps) {
  const {
    state: { status },
  } = useGameContext();

  const {
    onPause,
    onUnpause,
    onFinishedCountdown,
  } = useGameCallbacks();

  const isPlaying = status === GameStatus.PLAYING;
  const isPaused = status === GameStatus.PAUSED;

  if (!isPlaying && !isPaused) {
    return null;
  }

  const handlePauseResume = () => {
    if (isPaused) {
      // Restore the active session's difficulty
      // before resuming the game.
      onResume();

      onUnpause?.();
      onFinishedCountdown?.();
      return;
    }

    if (isPlaying) {
      onPause?.();
    }
  };

  return (
    <div className="game-controls">
      <button
        type="button"
        className="game-control-button"
        onClick={handlePauseResume}
      >
        {isPaused ? "RESUME" : "PAUSE"}
      </button>

      <button
        type="button"
        className="game-control-button"
        onClick={onNewGame}
      >
        NEW GAME
      </button>
    </div>
  );
}

export default GameControls;