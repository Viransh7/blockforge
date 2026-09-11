require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "blockforge-backend",
  });
});

app.use("/api/scores", scoreRoutes);

app.listen(PORT, () => {
  console.log(`BlockForge backend running on port ${PORT}`);
});