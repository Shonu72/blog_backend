const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/users");
app.use("/posts", postsRoute);
app.use("/users", userRoute);
module.exports = app;
