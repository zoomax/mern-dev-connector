const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../controllers/user.controller");
const { check } = require("express-validator");
// chech is a middleware function that applies validation constraints upon req.body properties as described in line 12
// "check" takes in two parameters
// first => property name
// second => a custom error message

//@route api/users
//@desc  add  user
//@access Public
router.post(
  "/",
  [
    check("name", "please provid a valid name").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "password must have at least 6 characters").isLength({
      min: 6,
    }),
    check(
      "confirmPassword",
      "password must have at least 6 characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);
router.post(
  "/login",
  [
    check("email", "email is required").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "password is required").not().isEmpty()
    
  ],
  loginUser
);

module.exports = router;
