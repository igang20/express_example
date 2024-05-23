const mongoose = require("mongoose");
const categoryModel = require("./category");
const userModel = require("./user");

const gameSchema = new mongoose.Schema({
  title: {
    //Указываем тип даных для поля
    type: String,
    // Требование обязательного заполнения
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: categoryModel,
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
  ],
});

gameSchema.statics.findGameByCategory = function (category) {
  return this.find({}) // Выполним поиск всех игр
    .populate({
      path: "categories",
      match: { name: category }, // Опция поможет сопоставить подходящие игры по выбранной категории
    })
    .populate({
      path: "users",
      select: "-password", // Позволяет получить записи о пользователях за исключением их паролей (они же хранятся в зашифрованном виде)
    })
    .then((games) => {
      // Отфильтруем по наличию искомой категории
      return games.filter((game) => game.categories.length > 0);
    });
  // ...
};

module.exports = mongoose.model("game", gameSchema);
