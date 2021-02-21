const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");
const {
  getCurrentUserProfile,
  createOrUpdateProfile,
  getProfiles,
  getUserProfile,
  deleteUserProfile,
  deleteProfileEducation,
  addProfileEducation,
  deleteProfileExperience,
  addProfileExperience,
  getProfileGithubRepos
} = require("../../controllers/profile.controller");
const { check } = require("express-validator");
//@route api/profiles/me
//@desc  Get  current user profile
//@access private
router.get("/me", auth, getCurrentUserProfile);

//@route api/profiles/
//@desc  post  create or update user profile
//@access private
router.post("/", auth,[
  check("skills", "skills is required").not().isEmpty() , 
  check("status", "status is required").not().isEmpty() , 
  check("company", "company required").not().isEmpty() , 
  check("location" , "location is required").not().isEmpty() , 
  check("bio" , "bio is required").not().isEmpty() , 
] , createOrUpdateProfile);

//@route api/profiles/
//@desc  get profiles
//@access public
router.get("/", getProfiles);

//@route api/profiles/:id
//@desc  get user profile
//@access public
router.get("/:id", getUserProfile);

//@route api/profiles/:id
//@desc  delete user&profile
//@access private
router.delete("/me", auth, deleteUserProfile);

// @route  api/profiles/me/educations/id
// @desc  delete profile education 
// @access private
router.delete("/me/educations/:id", auth, deleteProfileEducation);

// @route  api/profiles/me/educations
// @desc  add profile education 
// @access private
router.put("/me/educations",auth,[
    check("school", "school is required").not().isEmpty() , 
    check("fieldofstudy", "field of stduy is required").not().isEmpty() , 
    check("from", "from date is required").not().isEmpty() , 
    check("degree" , "degree is required")
] ,  addProfileEducation);


// @route  api/profiles/me/experiences/:id
// @desc  delete profile experience 
// @access private
router.delete("/me/experiences/:id", auth, deleteProfileExperience);

// @route  api/profiles/me/experiences
// @desc  delete profile experience 
// @access private
router.put("/me/experiences", [
    check("title", "title is required").not().isEmpty() , 
    check("company", "company is required").not().isEmpty() , 
    check("from", "from date is required").not().isEmpty()
], auth, addProfileExperience);

//@route   api/profiles/:username
//@desc    get profile's github repos
//@access public
router.get("/github/:username", getProfileGithubRepos);

module.exports = router;
