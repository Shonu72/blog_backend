require("dotenv").config();
const express = require("express");
const app = require("./app");

const server = express();
server.use("/", app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
