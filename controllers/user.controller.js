const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
// validationResults is a function that's responsible for dumbing validation errors related to the req.body object
// by passing in the req object as a parameter ;
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const response = require("./response");

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
        ...response,
        errors: errors.array(),
      });
    }
    const { password, confirmPassword, name, email } = req.body;
    const isEmail = await isUserEmail(email);
    if (isEmail) {
      return res.status(400).json({
        ...response,
        errors: ["this email is already taken"],
      });
    }
    if (password === confirmPassword) {
      const hash = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, hash);
      console.log(hashedPassword);
      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "mm",
      });
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      await newUser.save();

      res.status(201).json({
        ...response,
        success: true,
        data: [newUser],
        status: "Created",
        statusCode: 201,
      });
    } else {
      return res.status(400).json({
        ...response,
        errors: ["Passwords didn't match"],
      });
    }
  } catch (err) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
    });
  }
};

const loginUser = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ...response,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        ...response,
        errors: ["this email is already taken"],
        status: "Not Found",
        statusCode: 404,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      const newUser = user.toObject();
      delete newUser.tokens;
      delete newUser.password;
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 10800,
      });
      user.tokens.push(token);
      res.status(200).json({
        ...response,
        success: true,
        data: [{ ...newUser, token }],
        status: "OK",
        statusCode: 200,
      });
    } else {
      res.status(401).json({
        ...response,
        errors  : ["email or password are not correct"] , 
        status: "Unauthorized",
        statusCode: 401,
      });
    }
  } catch (err) {
    res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
