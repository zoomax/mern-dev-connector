const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
const ProfileModel = require("../models/profile.model");
const UserModel = require("../models/user.model");
const profileModel = require("../models/profile.model");

const getCurrentUserProfile = async function (req, res) {
  const { user } = req;
  try {
    const profile = await ProfileModel.findOne({
      user: user.id,
    }).populate("user", ["name", "avatar"]);
    if (profile) {
      return res.status(200).json({
        success: true,
        profile,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "this user has no profile ",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const createOrUpdateProfile = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const {
        company,
        website,
        location,
        bio,
        githubusername,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin,
        status,
        skills,
      } = req.body;
      const profileBody = { user: req.user.id };
      if (company) profileBody.company = company;
      if (website) profileBody.website = website;
      if (location) profileBody.location = location;
      if (bio) profileBody.bio = bio;
      if (githubusername) profileBody.githubusername = githubusername;
      if (youtube) profileBody.youtube = youtube;
      if (facebook) profileBody.facebook = facebook;
      if (instagram) profileBody.instagram = instagram;
      if (twitter) profileBody.twitter = twitter;
      if (linkedin) profileBody.linkedin = linkedin;
      if (status) profileBody.status = status;
      if (skills) {
        profileBody.skills = skills.split(",").map((skill) => skill.trim());
        console.log(profileBody.skills);
      }
      profileBody.social = {};
      if (youtube) profileBody.social.youtube = youtube;
      if (linkedin) profileBody.social.linkedin = linkedin;
      if (instagram) profileBody.social.instagram = instagram;
      if (facebook) profileBody.social.facebook = facebook;
      if (twitter) profileBody.social.twitter = twitter;
      let profile = await ProfileModel.findOne({ user: req.user.id });
      if (profile) {
        profile = await ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileBody },
          { new: true }
        );
        return res.status(203).json({
          success: true,
          profile,
        });
      } else {
        profile = new ProfileModel(profileBody);
        await profile.save();
        return res.status(201).json({
          success: true,
          profile,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      errors: err.message,
    });
  }
};
const getProfiles = async function (req, res) {
  try {
    const profiles = await ProfileModel.find().populate("user");
    if (profiles.length > 0) {
      return res.status(200).json({
        success: true,
        profiles,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "there are no profiles to be fetched yet",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};
const getUserProfile = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await ProfileModel.findOne({
      user: id,
    }).populate("user");
    if (profile) {
      return res.status(200).json({
        success: true,
        profile,
      });
    }
    return res.status(404).json({
      success: false,
      message: "this user has no profile",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};
const deleteUserProfile = async function (req, res) {
  const { id } = req.user;
  try {
    const profile = await ProfileModel.findOneAndDelete({ user: id });
    const user = await UserModel.findOneAndDelete({ _id: id });
    if (user && profile) {
      await profile.remove();
      await user.remove();
      return res.status(202).json({
        success: true,
        message: "both user and his profile were deleted successfully",
        profile,
        user,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "user or profile are not exist",
        profile,
        user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "inetrnal server error",
      errors: error.message,
    });
  }
};

// add/delete profile experience
const addProfileExperience = async function (req, res) {
  try {
    const errors = validationResult(req);
    let { id } = req.user;
    let { title, location, from, to, company, current, description } = req.body;
    if (errors.isEmpty()) {
      const profile = await ProfileModel.findOne({ user: id });
      if (profile) {
        const newExp = {
          title,
          current,
          description,
          location,
          from,
          to,
          company,
        };
        profile.experience.unshift(newExp);
        await profile.save();
        res.status(203).json({
          success: true,
          profile,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "profile is  not exist",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.massage,
    });
  }
};
const deleteProfileExperience = async function (req, res) {
  let { id } = req.user;
  let expId = req.params.id;
  try {
    const profile = await profileModel.findOne({ user: id });
    if (profile) {
      let experience = profile.experience.findIndex((exp) => exp.id === expId);
      if (experience != -1) {
        profile.experience.splice(experience, 1);
        await profile.save();
        return res.status(202).json({
          success: true,
          message: "experience is deleted successfully",
        });
      }
      return res.status(404).json({
        success: true,
        message: "there is no such experience",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};
// end  add/delete profile experience
// add/delete  profile education
const addProfileEducation = async function (req, res) {
  try {
    const errors = validationResult(req);
    console.log(errors);
    let { id } = req.user;
    let {
      degree,
      fieldofstudy,
      from,
      to,
      school,
      current,
      description,
    } = req.body;
    if (errors.isEmpty()) {
      const profile = await ProfileModel.findOne({ user: id });
      if (profile) {
        const newEdu = {
          degree,
          current,
          description,
          fieldofstudy,
          from,
          to,
          school,
        };
        console.log(newEdu);
        profile.education.unshift(newEdu);
        await profile.save();
        res.status(203).json({
          success: true,
          profile,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "profile is  not exist",
        });
      }
    }
    return res.status(400).json({
      success: false,
      message: "bad request",
      errors: errors.array(),
    });
  } catch (error) {
    return res.status(500).json({
      // success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};
const deleteProfileEducation = async function (req, res) {
  let { id } = req.user;
  let eduId = req.params.id;

  try {
    const profile = await profileModel.findOne({ user: id });
    if (profile) {
      let education = profile.education.findIndex((edu) => edu._id == eduId);

      if (education != -1) {
        profile.education.splice(education, 1);
        await profile.save();
        return res.status(202).json({
          success: true,
          message: "education is deleted successfully",
          profile,
        });
      }
      return res.status(404).json({
        success: true,
        message: "there is no such education",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};
const getProfileGithubRepos = async function (req, res) {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClient"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode !== 200) { 
        return res.status(400).json({
           success : false , 
           message  :  "username not found" , 

        }) 
      }
      return res.status(200).json({
        success : true , 
        repos  : JSON.parse(body)
      })
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      errors: error.message,
    });
  }
};

module.exports = {
  getCurrentUserProfile,
  createOrUpdateProfile,
  getProfiles,
  getUserProfile,
  deleteUserProfile,
  addProfileExperience,
  deleteProfileExperience,
  addProfileEducation,
  deleteProfileEducation,
  getProfileGithubRepos
};
