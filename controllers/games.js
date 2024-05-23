const { writeData } = require("../utils/data"); // Чтение и запись данных в JSON-файл

const sendAllGames = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(req.games));
};

const sendGamesCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendGamesById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendGameUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Игра обновлена" }));
};

const sendGameDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendMe = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

module.exports = {
  sendAllGames,
  sendGamesCreated,
  sendGamesById,
  sendGameUpdated,
  sendGameDeleted,
  sendMe,
};
