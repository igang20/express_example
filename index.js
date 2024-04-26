const express = require("express");
const { mainRoute } = require("./routes/main");
const { gamesRouter } = require("./routes/games");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");

const app = express();

app.use(
  cors,
  bodyParser.json(),
  mainRoute,
  gamesRouter,
  express.static(path.join(__dirname, "public"))
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
