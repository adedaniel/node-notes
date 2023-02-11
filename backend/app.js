const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");
const notes = require("./routes/notes");
const auth = require("./routes/auth");
const connectDB = require("./db/connect");
const notFound = require("./middleware/404");
const errorMiddleware = require("./middleware/error-handler");
const authenticate = require("./middleware/auth");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", authenticate, notes);

app.use(notFound);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Home page!!!!!");
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
