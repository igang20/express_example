const categoriesRouter = require("express").Router();

const findAllCategories = require("../middlewares/categories");
const sendAllCategories = require("../controllers/categroies");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);

module.exports = categoriesRouter;
