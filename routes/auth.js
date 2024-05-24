const authRouter = require("express").Router();
const { login } = require("../controllers/auth");
const { sendUserCreated } = require("../controllers/users");
const {
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  hashPassword,
  createUser,
} = require("../middlewares/users");

authRouter.post("/auth/login", login);
authRouter.post(
  "/auth/registration",
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  hashPassword,
  createUser,
  sendUserCreated
);

module.exports = authRouter;
