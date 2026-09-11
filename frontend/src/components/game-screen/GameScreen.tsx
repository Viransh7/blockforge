import { useState } from "react";

import { useAppCallbacks } from "../../foundation/context/app";
import {
  useGameCallbacks,
  useGameContext,
  useOnPlay,
} from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";
import { Game } from "../../foundation/game/game";
import NextPiece from "../next-piece/NextPiece";
import GameStats from "../game-stats/GameStats";
import GameControls from "../game-controls/GameControls";
import GameControlsInfo from "../game-controls-info/GameControlsInfo";
import GameOver from "../game-over/GameOver";
import DifficultySelector from "../difficulty-selector/DifficultySelector";

export type Difficulty = "EASY" | "NORMAL" | "HARD";

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { level: number; rows: number }
> = {
  EASY: {
    level: 1,
    rows: 0,
  },
  NORMAL: {
    level: 3,
    rows: 5,
  },
  HARD: {
    level: 5,
    rows: 8,
  },
};

function GameScreen() {
  const {
    state: { status },
  } = useGameContext();

  const { onChangeInitialLevel, onChangeInitialRows } = useAppCallbacks();

  const onPlay = useOnPlay();
  const { onFinishedCountdown } = useGameCallbacks();

  const [pendingDifficulty, setPendingDifficulty] =
    useState<Difficulty>("NORMAL");

  const [activeDifficulty, setActiveDifficulty] =
    useState<Difficulty>("NORMAL");

  const applyDifficulty = (difficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[difficulty];

    onChangeInitialLevel?.(config.level);
    onChangeInitialRows?.(config.rows);

    setActiveDifficulty(difficulty);
  };

  const startGameWithDifficulty = (difficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[difficulty];

    applyDifficulty(difficulty);
    onPlay(config.rows);
    onFinishedCountdown?.();
  };

  const handleStartGame = () => {
    startGameWithDifficulty(pendingDifficulty);
  };

  const handleNewGame = () => {
    startGameWithDifficulty(pendingDifficulty);
  };

  const handleResume = () => {
    setPendingDifficulty(activeDifficulty);
  };

  const handlePlayAgain = () => {
    startGameWithDifficulty(pendingDifficulty);
  };

  return (
    <section className="blockforge-game">
      <div className="blockforge-layout">
        <aside className="blockforge-panel blockforge-panel-left">
          <NextPiece />

          <GameControls
            onNewGame={handleNewGame}
            onResume={handleResume}
          />

          <DifficultySelector
            selectedDifficulty={pendingDifficulty}
            onDifficultyChange={setPendingDifficulty}
          />

          {status === GameStatus.IDLE && (
            <button
              type="button"
              onClick={handleStartGame}
            >
              START GAME
            </button>
          )}

          <GameControlsInfo />
        </aside>

        <div className="blockforge-board">
          <Game onResume={handleResume} />
          <GameOver onPlayAgain={handlePlayAgain} />
        </div>

        <aside className="blockforge-panel blockforge-panel-right">
          <GameStats />
        </aside>
      </div>
    </section>
  );
}

export default GameScreen;