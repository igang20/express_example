const categories = require("../models/category");

async function findAllCategories(req, res, next) {
  req.categoriesArray = await categories.find({});
  next();
}

module.exports = findAllCategories;
