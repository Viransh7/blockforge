import { useEffect, useState } from "react";

import { submitScore } from "../../api/scores";
import { useGameContext } from "../../foundation/context/game";
import { GameStatus } from "../../foundation/shared/constants/game";
import { useLevel } from "../../foundation/shared/hooks/use-level";
import { useScore } from "../../foundation/shared/hooks/use-score";

import type { Difficulty } from "../game-screen/GameScreen";

type GameOverProps = {
  onPlayAgain: () => void;
  gameDuration: number;
  difficulty: Difficulty;
  onScoreSubmitted: () => void;
};

function GameOver({
  onPlayAgain,
  gameDuration,
  difficulty,
  onScoreSubmitted,
}: GameOverProps) {
  const {
    state: { status, cleared },
  } = useGameContext();

  const level = useLevel();
  const score = useScore();

  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (status !== GameStatus.FINISHED) {
      setPlayerName("");
      setIsSubmitting(false);
      setHasSubmitted(false);
      setSubmitMessage("");
    }
  }, [status]);

  if (status !== GameStatus.FINISHED) {
    return null;
  }

  const handleSubmit = async () => {
    const trimmedName = playerName.trim();

    if (!trimmedName || isSubmitting || hasSubmitted) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await submitScore({
        playerName: trimmedName,
        score,
        lines: cleared,
        level,
        gameDuration,
        difficulty,
      });

      setHasSubmitted(true);
      setSubmitMessage("SCORE SUBMITTED");
      onScoreSubmitted();
    } catch {
      setSubmitMessage("SUBMISSION FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blockforge-game-over">
      <div className="blockforge-game-over-backdrop" />

      <div className="blockforge-game-over-card">
        <p className="blockforge-game-over-label">GAME OVER</p>

        <h2>{score.toLocaleString()}</h2>

        <p className="blockforge-game-over-score-label">
          FINAL SCORE
        </p>

        <label htmlFor="player-name">
          PLAYER NAME
        </label>

        <input
          id="player-name"
          type="text"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          maxLength={20}
          placeholder="Enter your name"
          disabled={isSubmitting || hasSubmitted}
        />

        <p>Duration: {gameDuration}s</p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!playerName.trim() || isSubmitting || hasSubmitted}
        >
          {isSubmitting
            ? "SUBMITTING..."
            : hasSubmitted
              ? "SUBMITTED"
              : "SUBMIT SCORE"}
        </button>

        {submitMessage && (
          <p>{submitMessage}</p>
        )}

        <button
          type="button"
          onClick={onPlayAgain}
          disabled={isSubmitting}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default GameOver;