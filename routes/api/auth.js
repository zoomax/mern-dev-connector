const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const userModel = require("../../models/user.model") ; 

//@route api/auth
//@desc  test routes
//@access Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const user  =  await userModel.findById(id).select("-password") ;
    if(user)  {
        res.status(200).json({
            success : true , 
            user 
        })
    }else { 
        res.status(401).json({
            success: false  , 
            message  : "access denied" 
        })
    }
  } catch (err) {
    res.status(500).json({
        success: false  , 
        message  : err.message 
    })
  }
});

module.exports = router;
