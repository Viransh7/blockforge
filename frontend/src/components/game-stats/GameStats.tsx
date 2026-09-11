import { useEffect, useState } from "react";

import { useGameContext } from "../../foundation/context/game";
import { useLevel } from "../../foundation/shared/hooks/use-level";
import { useScore } from "../../foundation/shared/hooks/use-score";
import {
  getLeaderboard,
  type Difficulty,
} from "../../api/scores";

type GameStatsProps = {
  difficulty: Difficulty;
  refreshKey: number;
};

function GameStats({
  difficulty,
  refreshKey,
}: GameStatsProps) {
  const {
    state: { cleared },
  } = useGameContext();

  const score = useScore();
  const level = useLevel();

  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadHighScore = async () => {
      try {
        const leaderboard = await getLeaderboard(difficulty);

        if (!cancelled) {
          setHighScore(leaderboard[0]?.score ?? null);
        }
      } catch {
        if (!cancelled) {
          setHighScore(null);
        }
      }
    };

    loadHighScore();

    return () => {
      cancelled = true;
    };
  }, [difficulty, refreshKey]);

  return (
    <div className="game-stats">
      <div className="game-stat">
        <span className="game-stat-label">CURRENT SCORE</span>
        <span className="game-stat-value">
          {score.toLocaleString()}
        </span>
      </div>

      <div className="game-stat">
        <span className="game-stat-label">HIGH SCORE</span>
        <span className="game-stat-value">
          {highScore !== null
            ? highScore.toLocaleString()
            : "—"}
        </span>
      </div>

      <div className="game-stat">
        <span className="game-stat-label">LEVEL</span>
        <span className="game-stat-value">{level}</span>
      </div>

      <div className="game-stat">
        <span className="game-stat-label">LINES</span>
        <span className="game-stat-value">{cleared}</span>
      </div>
    </div>
  );
}

export default GameStats;