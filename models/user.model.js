const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  tokens: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", function (next) {
  const payload = {
    user: {
      id: this.id,
    },
  };
  const token = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 10800,
  });
  this.tokens.push(token);
  console.log(" log statement from pre middleware")
  next();
});

module.exports = model("Users", userSchema);
