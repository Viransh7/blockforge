export type Difficulty = "EASY" | "NORMAL" | "HARD";

export type LeaderboardEntry = {
  _id: string;
  playerName: string;
  score: number;
  lines: number;
  level: number;
  gameDuration: number;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
};

const API_BASE_URL = "http://localhost:3000/api";

export async function getLeaderboard(
  difficulty: Difficulty
): Promise<LeaderboardEntry[]> {
  const response = await fetch(
    `${API_BASE_URL}/scores/leaderboard?difficulty=${difficulty}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  return response.json();
}

export type SubmitScoreData = {
  playerName: string;
  score: number;
  lines: number;
  level: number;
  gameDuration: number;
  difficulty: Difficulty;
};

export async function submitScore(
  scoreData: SubmitScoreData
): Promise<LeaderboardEntry> {
  const response = await fetch(`${API_BASE_URL}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scoreData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit score");
  }

  return response.json();
}