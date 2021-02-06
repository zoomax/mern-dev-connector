const express = require("express") ; 
const router = express.Router() ; 
const auth  = require("../../middlewares/auth.middleware")  ; 
const {getCurrentUserProfile, createOrUpdateProfile, getProfiles, getUserProfile, deleteUserProfile} = require("../../controllers/profile.controller") ; 

//@route api/profiles/me
//@desc  Get  current user profile 
//@access private    
router.get("/me" , auth , getCurrentUserProfile)  ; 

//@route api/profiles/
//@desc  post  create or update user profile 
//@access private    
router.post("/" , auth , createOrUpdateProfile)  ; 
//@route api/profiles/
//@desc  get profiles
//@access public    

router.get("/" , getProfiles)  ; 
//@route api/profiles/:id
//@desc  get user profile
//@access public 
router.get("/:id" , getUserProfile)
//@route api/profiles/:id
//@desc  delete user&profile
//@access private 
router.delete("/:id",auth , deleteUserProfile) ; 
module.exports = router ; 