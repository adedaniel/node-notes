const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authorize = require("./middleware/authorize");
const notes = require("./routes/notes");
const auth = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authorize);
app.use(express.static("public"));

app.use("/api/notes", notes);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Home page!!!!!");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
