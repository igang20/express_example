const categories = require("../models/category");
const db = require("../database/postgresConnect");

async function findAllCategories(req, res, next) {
  // req.categoriesArray = await categories.find({});
  const categories = await db.query("select * from category order by id");
  req.categoriesArray = categories.rows;
  next();
}

const createCategory = async (req, res, next) => {
  try {
    console.log("POST /categories");
    // req.category = await categories.create(req.body);
    const newCategory = await db.query(
      "insert INTO category VALUES(default, $1) RETURNING *",
      [req.body.name]
    );
    req.category = newCategory.rows;
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    console.log(error);
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    next();
  }
};
const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Категория с таким названием уже существует",
      })
    );
  } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

const findCategoryById = async (req, res, next) => {
  console.log("GET /categories/:id");
  try {
    const neceseryCategory = await db.query(
      "select * from category where id = $1",
      [req.params.id]
    );
    req.category = neceseryCategory.rows;
    next();
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    // req.caegory = await categories.findByIdAndUpdate(req.params.id, req.body);
    console.log(req.params.id);
    const updateCategory = await db.query(
      "UPDATE category SET name = $1 WHERE id = $2 RETURNING *",
      [req.body.name, req.params.id]
    );
    console.log(updateCategory);
    req.category = updateCategory.rows;
    next();
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления категории" }));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    // req.caegory = await categories.findByIdAndDelete(req.params.id, req.body);
    const deletedCategory = await db.query(
      "DELETE FROM category WHERE id = $1 returning *",
      [req.params.id]
    );
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};
module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
};
