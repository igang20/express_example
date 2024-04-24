const { readData } = require("../utils/data");
const games = require("../models/game");

const getAllGames = async (req, res, next) => {
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
  next();
};

const findAllGames = async (req, res, next) => {
  const result = await games.find({}).populate("categories").populate("users");
  console.log(result);
  if (!result) {
    res.status(400);
    res.send({
      status: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = result;
  next();

  next();
};

module.exports = { getAllGames, findAllGames };
