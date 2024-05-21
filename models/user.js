const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

return bcrypt.compare(password, user.password).then((matched) => {
  if (!matched) {
    return Promise.reject(new Error("Неправильные почта или пароль"));
  }

  return user; // Теперь user доступен
});
module.exports = mongoose.model("user", userSchema);
