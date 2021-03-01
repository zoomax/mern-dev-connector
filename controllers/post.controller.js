const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const response = require("./response");
const createPost = async function (req, res) {
  try {
    const errors = validationResult(req);
    const { id } = req.user;
    let { text } = req.body;
    if (errors.isEmpty()) {
      const user = await UserModel.findById(id);
      if (user) {
        const postBody = {
          text,
          user: id,
          avatar: user.avatar,
          name: user.name,
        };
        const post = new PostModel(postBody);
        await post.save();
        return res.status(201).json({
          ...response,
          success: true,
          data: [post],
          status: "Created",
          statusCode: 201,
        });
      }
      return res.status(404).json({
        ...response,
        errors: ["please signup"],
        status: "Not Found",
        statusCode: 404,
      });
    }
    return res.status(400).json({
      ...response,
      errors: errors.array(),
    });
  } catch (err) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};
const getPosts = async function (req, res) {
  try {
    const posts = await PostModel.find();
    if (posts.length > 0) {
      return res.status(200).json({
        ...response,
        success: true,
        data: posts,
        status: "Created",
        statusCode: 200,
      });
    }
    return res.status(404).json({
      ...response,
      errors: ["no posts to be viewed"],
      status: "Not Found",
      statusCode: 404,
    });
  } catch (err) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};
const getPost = async function (req, res) {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    if (post) {
      return res.status(200).json({
        ...response,
        success: true,
        data: [post],
        status: "Created",
        statusCode: 200,
      });
    }
    return res.status(404).json({
      ...response,
      errors: ["post not found"],
      status: "Not Found",
      statusCode: 404,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};
const addAndDeletePostLike = async function (req, res) {
  try {
    const user = req.user.id;
    const { id } = req.params;
    const post = await PostModel.findById(id);
    const currentUser = await UserModel.findById(user);
    if (post && currentUser) {
      let userIndex = post.likes.findIndex((like) => like == user);

      if (userIndex !== -1) {
        post.likes.splice(userIndex, 1);
      } else {
        post.likes.push(user);
      }
      await post.save();
      return res.status(203).json({
        ...response,
        success: true,
        data: post.likes,
        status: "Updated",
        statusCode: 203,
      });
    } else {
      return res.status(400).json({
        ...response,
        errors: ["user or post are not exist"],
      });
    }
  } catch (error) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};
const addPostComment = async function (req, res) {
  try {
    const user = req.user.id;
    const { id } = req.params;
    const { text } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const currentUser = await UserModel.findById(user);
      const post = await PostModel.findById(id);
      if (currentUser && post) {
        const comment = {
          text,
          user,
          avatar: currentUser.avatar,
          name: currentUser.name,
        };
        post.comments.push(comment);
        await post.save();
        return res.status(203).json({
          ...response,
          success: true,
          data: [post],
          status: "Updated",
          statusCode: 203,
        });
      }
      return res.status(400).json({
        ...response,
        errors: ["user or post are not exist"],
      });
    }
    return res.status(400).json({
      ...response,
      errors: errors.array(),
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};

const deletePostComment = async function (req, res) {
  try {
    const user = req.user.id;
    const { id, commentId } = req.params;
    const currentUser = await UserModel.findById(user);
    const post = await PostModel.findById(id);
    if (currentUser && post) {
      const commentIndex = post.comments.findIndex(
        (comment) => comment._id.toString() === commentId.toString()
      );
      if (commentIndex != -1) {
        const comment = post.comments[commentIndex];
        if (
          currentUser._id.toString() == comment.user.toString() ||
          post.user.toString() == comment.user.toString()
        ) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return res.status(203).json({
            ...response,
            success: true,
            data: [post],
            status: "Updated",
            statusCode: 203,
          });
        }
        return res.status(403).json({
          ...response,
          status: "Unauthorized",
          statusCode: 403,
          errors: ["user is not authorized to delete this comment"],
        });
      } else {
        return res.status(404).json({
          ...response,
          errors: ["comment is not exist"],
          status: "Not Found",
          statusCode: 404,
        });
      }
    }
    return res.status(404).json({
      
      ...response,
      errors: [ "post is not found or user is not exist"],
      status: "Not Found",
      statusCode: 404,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};

const deletePost = async function (req, res) {
  try {
    const post = await PostModel.findById(req.params.id);
    const user = await UserModel.findById(req.user.id);
    if (post && user) {
      if (post.user.toString() === user._id.toString()) {
        await PostModel.findByIdAndDelete(post._id);
        return res.status(202).json({
          success: true,
          message: "post deleted successfully",
          post,
        });
      } else {
        return res.status(403).json({
          success: true,
          message: "user is not authorized to delete this post",
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: "post or user are not exist",
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: [err.message],
    });
  }
};
module.exports = {
  createPost,
  getPosts,
  addAndDeletePostLike,
  addPostComment,
  deletePostComment,
  deletePost,
  getPost,
};
