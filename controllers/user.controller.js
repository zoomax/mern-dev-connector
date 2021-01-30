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
        success: true,
        user: newUser,
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


const loginUser  = async function (req ,res , next ) { 
  try  { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        erorrs: errors.array(),
      });
    }
    const {email , password} = req.body ; 
    const user = await userModel.findOne({email}); 
    if(!user) { 
      res.status(404).json({
        success:false  , 
        message :  "user is not exist" 
      })
    }
    const isPassword = await bcrypt.compare(password ,user.password ) ; 
    if(isPassword) { 
      const payload  =  {
        user :  { 
          id : user.id 
        } 

      }
      const newUser  = user.toObject(); 
      delete newUser.tokens   ;
      delete newUser.password ; 
      const token =  jwt.sign(payload  , config.get("jwtSecret") , {expiresIn : 10800}) ; 
      user.tokens.push(token)  ; 
      res.status(200).json ({
        success : true , 
        user : {...newUser , token}
      })
      
    }else { 
      res.status(401).json({
        success : false , 
        message  : "email or password  are not correct"
      })   }

  }catch (err) { 
    res.status(500).json({
      success : false , 
      message  : err.message
    })   }
  }

module.exports = {
  registerUser,
  loginUser,
};
