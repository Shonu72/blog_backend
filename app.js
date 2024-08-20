const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.get("/", (req, res) => {
  res.send("Hello World");
});

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const imageRoute = require("./routes/images");
app.use("/posts", postsRoute);
app.use("/users", userRoute);
app.use("/images", imageRoute);
module.exports = app;
