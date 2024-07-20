const users = require("../models/user");
const bcrypt = require("bcryptjs");
const db = require("../database/postgresConnect");

async function findAllUsers(req, res, next) {
  // req.usersArray = await users.find({}, { password: 0 });
  const usersArray = await db.query(
    'select id, username, email from "user" ORDER BY id '
  );

  req.usersArray = usersArray.rows;
  next();
}

const createUser = async (req, res, next) => {
  console.log("POST /users");

  try {
    // req.user = await users.create(req.body);
    const { username, email, password } = req.body;
    const newUser = await db.query(
      'INSERT INTO "user" VALUES (default, $1, $2, $3) RETURNING *',
      [username, email, password]
    );
    req.user = newUser.rows;
    next();
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    // req.user = await users.findById(req.params.id, { password: 0 });
    const userById = await db.query(
      'SELECT id, username, email FROM "user" WHERE id = $1',
      [req.params.id]
    );
    req.user = userById.rows;
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    // req.user = await users.findByIdAndUpdate(req.params.id, req.body);

    const updatedUser = await db.query(
      'UPDATE "user" set username = $1, email = $2 where id = $3 returning *',
      [username, email, req.params.id]
    );
    req.user = updatedUser;
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // req.user = await users.findByIdAndDelete(req.params.id);
    const deletedUser = await db.query('DELETE FROM "user" WHERE id = $1', [
      req.params.id,
    ]);
    req.user = deletedUser.rows;
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Пользователь с таким email уже существует" })
      );
  } else {
    next();
  }
};

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  hashPassword,
};
