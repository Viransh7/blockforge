const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const { difficulty } = req.query;

    if (!["EASY", "NORMAL", "HARD"].includes(difficulty)) {
      return res.status(400).json({
        message: "Invalid difficulty",
      });
    }

    const scores = await Score.find({ difficulty })
      .sort({ score: -1 })
      .limit(10);

    res.json(scores);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      playerName,
      score,
      lines,
      level,
      gameDuration,
      difficulty,
    } = req.body;

    if (
      typeof playerName !== "string" ||
      !playerName.trim() ||
      typeof score !== "number" ||
      typeof lines !== "number" ||
      typeof level !== "number" ||
      typeof gameDuration !== "number" ||
      !["EASY", "NORMAL", "HARD"].includes(difficulty)
    ) {
      return res.status(400).json({
        message: "Invalid score data",
      });
    }

    const newScore = await Score.create({
      playerName: playerName.trim(),
      score,
      lines,
      level,
      gameDuration,
      difficulty,
    });

    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({
      message: "Failed to save score",
      error: error.message,
    });
  }
});

module.exports = router;