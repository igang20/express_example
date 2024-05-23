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
  checkIsVoteRequest,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGamesCreated,
  sendGamesById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");
const { checkAuth } = require("../middlewares/auth");

gamesRouter.post(
  "/games/",
  findAllGames,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  checkAuth,
  createGame,
  sendGamesCreated
);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkAuth,
  updateGame,
  sendGameUpdated
);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGamesById);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

module.exports = { gamesRouter };
