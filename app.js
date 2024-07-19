const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);
module.exports = app;