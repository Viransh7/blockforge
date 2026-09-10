import { useGameCallbacks, useOnPlay } from "../../foundation/context/game";
import { Game } from "../../foundation/game/game";
import NextPiece from "../next-piece/NextPiece";
import GameStats from "../game-stats/GameStats";
import GameControls from "../game-controls/GameControls";
import GameControlsInfo from "../game-controls-info/GameControlsInfo";
import GameOver from "../game-over/GameOver";

function GameScreen() {
  const onPlay = useOnPlay();
  const { onFinishedCountdown } = useGameCallbacks();

  return (
    <section className="blockforge-game">
      <div className="blockforge-layout">
        <aside className="blockforge-panel blockforge-panel-left">
          <NextPiece />
          <GameControls />
          <button
            onClick={() => {
              onPlay();
              onFinishedCountdown?.();
            }}
          >
            START GAME
          </button>
          <GameControlsInfo />
        </aside>

        <div className="blockforge-board">
          <Game />
          <GameOver />
        </div>

        <aside className="blockforge-panel blockforge-panel-right">
          <GameStats />
        </aside>
      </div>
    </section>
  );
}

export default GameScreen;