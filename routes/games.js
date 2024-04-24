const gamesRouter = require("express").Router(); // Создали роутер
const { findAllGames } = require("../middlewares/games");
const {
  sendAllGames,
  deleteGame,
  addGameController,
} = require("../controllers/games");

gamesRouter.post("/games", findAllGames, addGameController);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.delete("/games/:id", findAllGames, deleteGame);

module.exports = { gamesRouter };
