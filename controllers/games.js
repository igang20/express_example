const { readData } = require("../utils/data");

const sendAllGames = async (req, res, next) => {
  const games = await readData("./data/games.json");
  if (!games) {
    res.status(400);
    res.send({
      status: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = games;
  res.send(games);
};

const sendUpdatedGames = (req, res) => {
  res.send({
    games: req.games,
    updated: req.updatedObject,
  });
};

module.exports = { sendAllGames, sendUpdatedGames };
