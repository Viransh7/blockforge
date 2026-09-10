import { useGameCallbacks, useGameContext } from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";

function GameControls() {
  const {
    state: { status },
  } = useGameContext();

  const { onPause, onUnpause, onFinishedCountdown } = useGameCallbacks();

  const isPlaying = status === GameStatus.PLAYING;
  const isPaused = status === GameStatus.PAUSED;

  const handleClick = () => {
    if (isPaused) {
      onUnpause?.();
      onFinishedCountdown?.();
    } else if (isPlaying) {
      onPause?.();
    }
  };

  if (!isPlaying && !isPaused) {
    return null;
  }

  return (
    <button
      type="button"
      className="game-control-button"
      onClick={handleClick}
    >
      {isPaused ? "RESUME" : "PAUSE"}
    </button>
  );
}

export default GameControls;