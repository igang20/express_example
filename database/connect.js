const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/pindie";

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Успешно подключен к DB");
  } catch (error) {
    console.log("При подключении к DB произошла ошибка");
    console.error("Ошибка: " + error);
  }
}

module.exports = {
  connectToDatabase,
};
