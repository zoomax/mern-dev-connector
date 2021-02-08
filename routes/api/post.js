const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth.middleware");
const {
  createPost,
  getPosts,
  addAndDeletePostLike,
  addPostComment,
  deletePostComment,
  deletePost,
} = require("../../controllers/post.controller");

//@route api/posts
//@desc  POST add a post
//@access private
router.post(
  "/",
  [check("text", "text id required").not().isEmpty()],
  auth,
  createPost
);

//@route api/posts
//@desc  GET  get posts
//@access  public
router.get("/", getPosts);

//@route api/posts/:id
//@desc  PUT like/dislike post
//@access  private
router.put("/:id", auth, addAndDeletePostLike);

//@route api/posts/:id/comment
//@desc  PUT add post comment
//@access  private
router.put(
  "/:id/comments",
  [check("text", "text id required").not().isEmpty()],
  auth,
  addPostComment
);

//@route api/posts/:id/comment
//@desc  PUT add post comment
//@access  private
router.put("/:id/comments/:commentId", auth, deletePostComment);


//@route api/posts/:id
//@desc  delete post
//@access  private
router.delete("/:id", auth, deletePost);

module.exports = router;

// testig purposes end-point callback function
// (req , res)=>{
//   res.status(200).json({
//     success  : true
//   })  }
