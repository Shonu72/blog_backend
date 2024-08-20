const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: req.userData.userId,
  };

  const schecma = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "1000" },
    categoryId: { type: "number", optional: false },
  };

  const v = new Validator();
  const valResponse = v.validate(post, schecma);

  if (valResponse !== true) {
    return res.status(400).json({
      message: "Inavalid post type or missing fields",
      errors: valResponse,
    });
  }

  models.Category.findByPk(req.body.categoryId).then(result => {
    if (result !== null) {
      models.Post.create(post)
        .then((result) => {
          res.status(201).json({
            message: "Post created successfully",
            post: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "something went wrong",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "invalid category",
      });
    }
  })

}

function showPost(req, res) {
  // find by primary key (id)
  models.Post.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function showAllPosts(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function updatePost(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
  };
  const userId = req.userData.userId;

  const schecma = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "1000" },
    categoryId: { type: "number", optional: false },
  };

  const v = new Validator();
  const valResponse = v.validate(updatedPost, schecma);

  if (valResponse !== true) {
    return res.status(400).json({
      message: "Inavalid post type or missing fields",
      errors: valResponse,
    });
  }

  models.Category.findByPk(req.body.categoryId).then(result => {
    if (result !== null) {
      models.Post.update(updatedPost, { where: { id: id, userId: userId } })
        .then((result) => {
          res.status(200).json({
            message: "Post updated successfully",
            result: updatedPost,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalid category"
      })
    }
  })

}

function deletePost(req, res) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted successfully",
        // result: updatedPost,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

module.exports = {
  save: save,
  showPost: showPost,
  showAllPosts: showAllPosts,
  updatePost: updatePost,
  deletePost: deletePost,
};
