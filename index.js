const express = require("express");
const { mainRoute } = require("./routes/main");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const { connectToDatabase } = require("./database/connect");
const apiRouter = require("./routes/apiRouter");
const cookieParser = require("cookie-parser");
const { pagesRouter } = require("./routes/pages");

const app = express();

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  mainRoute,
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
