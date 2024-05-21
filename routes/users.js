const usersRouter = require("express").Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  hashPassword,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  senduserDeleted,
} = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,

  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", deleteUser, senduserDeleted);

module.exports = { usersRouter };
