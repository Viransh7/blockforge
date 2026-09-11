import { Difficulty } from "../game-screen/GameScreen";

type DifficultySelectorProps = {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
};

function DifficultySelector({
  selectedDifficulty,
  onDifficultyChange,
}: DifficultySelectorProps) {
  return (
    <div className="blockforge-difficulty">
      <h2>DIFFICULTY</h2>

      <div className="blockforge-difficulty-options">
        {(["EASY", "NORMAL", "HARD"] as Difficulty[]).map((option) => (
          <button
            key={option}
            type="button"
            className={`blockforge-difficulty-button ${
              selectedDifficulty === option ? "active" : ""
            }`}
            onClick={() => onDifficultyChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;