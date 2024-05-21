const gamesRouter = require("express").Router(); // Создали роутер

const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGamesCreated,
  sendGamesById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.post(
  "/games/",
  findAllGames,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  createGame,
  sendGamesCreated
);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  updateGame,
  sendGameUpdated
);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGamesById);
gamesRouter.delete("/games/:id", deleteGame, sendGameDeleted);

module.exports = { gamesRouter };
