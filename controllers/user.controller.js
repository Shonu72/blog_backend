const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function register(req, res) {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((result) => {
    if (result) {
      res.status(409).json({
        message: "Email already exists",
      });
    } else {
      bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
          };

          models.User.create(user)
            .then((result) => {
              res.status(201).json({
                message: "User created successfully",
                user: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Someting went wrong",
              });
            });
        });
      });
    }
  });
}
module.exports = {
  register: register,
};
