const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authorize = require("./middleware/authorize");
const notes = require("./routes/notes");
const auth = require("./routes/auth");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authorize);
app.use(express.static("public"));

app.use("/api/v1/notes", notes);
app.use("/api/v1/auth", auth);

app.get("/", (req, res) => {
  res.send("Home page!!!!!");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => console.log("listening on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
