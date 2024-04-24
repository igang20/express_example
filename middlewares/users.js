const users = require("../models/user");

async function findAllUsers(req, res, next) {
  req.usersArray = await users.find({});
  next();
}

module.exports = findAllUsers;
