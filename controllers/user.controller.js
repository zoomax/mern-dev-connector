const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
// validationResults is a function that's responsible for dumbing validation errors related to the req.body object
// by passing in the req object as a parameter ;
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

const isUserEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        erorrs: errors.array(),
      });
    }
    const { password, confirmPassword, name, email } = req.body;
    const isEmail = await isUserEmail(email);
    if (isEmail) {
      return res.status(400).json({
        success: false,
        erorrMessage: "this email is already taken ",
      });
    }
    if (password === confirmPassword) {
      const hash = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, hash);
      console.log(hashedPassword) ; 
      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "mm",
      });
      const newUser = new userModel({
        name,
        email,
        password : hashedPassword,
        avatar,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 10800,
      });
      console.log(token)
      res.status(201).json({
        success: true,
        token
      });
    } else {
      return res.status(400).json({
        success: false,
        erorrMessage: "passwords didn't match",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      erorrMessage: err.message,
    });
  }
};
module.exports = {
  registerUser,
};
