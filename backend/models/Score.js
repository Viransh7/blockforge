const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
    },

    lines: {
      type: Number,
      required: true,
      min: 0,
    },

    level: {
      type: Number,
      required: true,
      min: 1,
    },

    gameDuration: {
      type: Number,
      required: true,
      min: 0,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["EASY", "NORMAL", "HARD"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);