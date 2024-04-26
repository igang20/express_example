const gamesRouter = require("express").Router(); // Создали роутер
const { sendAllGames, sendUpdatedGames } = require("../controllers/games");
const {
  deleteGame,
  checkIsTitleInArray,
  getAllGames,
  updateGamesArray,
  updateGamesFile,
  findGameById,
} = require("../middlewares/games");

gamesRouter.get("/games", getAllGames, sendAllGames);

gamesRouter.post(
  "/games",
  getAllGames,
  checkIsTitleInArray,
  updateGamesArray,
  updateGamesFile,
  sendUpdatedGames
);

gamesRouter.delete(
  "/games/:id",
  getAllGames,
  findGameById,
  deleteGame,
  updateGamesFile,
  sendUpdatedGames
);

module.exports = { gamesRouter };
