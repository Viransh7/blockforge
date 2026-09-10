import { useGameContext } from "../../foundation/context/game";
import { useLevel } from "../../foundation/shared/hooks/use-level";
import { useScore } from "../../foundation/shared/hooks/use-score";

function GameStats() {
  const {
    state: { cleared },
  } = useGameContext();

  const score = useScore();
  const level = useLevel();

  return (
    <div className="game-stats">
      <div className="game-stat">
        <span className="game-stat-label">CURRENT SCORE</span>
        <span className="game-stat-value">{score.toLocaleString()}</span>
      </div>

      <div className="game-stat">
        <span className="game-stat-label">HIGH SCORE</span>
        <span className="game-stat-value">—</span>
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