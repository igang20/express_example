const express = require("express");
const { mainRoute } = require("./routes/main");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const { connectToDatabase } = require("./database/connect");
const apiRouter = require("./routes/apiRouter");

const app = express();

connectToDatabase();

app.use(
  cors,
  bodyParser.json(),
  mainRoute,
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
