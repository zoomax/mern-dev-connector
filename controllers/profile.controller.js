const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
const ProfileModel = require("../models/profile.model");
const UserModel = require("../models/user.model");
const profileModel = require("../models/profile.model");
const PostModel = require("../models/post.model");
const response = require("./response");

const getCurrentUserProfile = async function (req, res) {
  const { user } = req;
  try {
    const profile = await ProfileModel.findOne({
      user: user.id,
    }).populate("user", ["name", "avatar"]);
    if (profile) {
      return res.status(200).json({
        ...response,
        success: true,
        status: "OK",
        statusCode: 200,
        data: [profile],
      });
    } else {
      return res.status(404).json({
        ...response,
        errors: ["this user has no profile"],
        status: "Not Found",
        statusCode: 404,
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
          ...response,
          success: true,
          status: "Updated",
          statusCode: 203,
          data: [profile],
        });
      } else {
        profile = new ProfileModel(profileBody);
        await profile.save();
        return res.status(201).json({
          ...response,
          success: true,
          status: "Created",
          statusCode: 201,
          data: [profile],
        });
      }
    } else {
      return res.status(400).json({
        ...response,
        errors: errors.array(),
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
const getProfiles = async function (req, res) {
  try {
    const profiles = await ProfileModel.find().populate("user");
    if (profiles.length > 0) {
      return res.status(200).json({
        ...response,
        success: true,
        status: "OK",
        statusCode: 200,
        data: profiles,
      });
    } else {
      return res.status(404).json({
        ...response,
        errors: ["Data were not found"],
        status: "Not Found",
        statusCode: 404,
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
const getUserProfile = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await ProfileModel.findOne({
      user: id,
    }).populate("user");
    if (profile) {
      return res.status(200).json({
        ...response,
        success: true,
        status: "OK",
        statusCode: 200,
        data: [profile],
      });
    }
    return res.status(404).json({
      ...response,
      errors: ["This user has no profile"],
      status: "Not Found",
      statusCode: 404,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
    });
  }
};
const deleteUserProfile = async function (req, res) {
  const { id } = req.user;
  try {
    const profile = await ProfileModel.findOneAndDelete({ user: id });
    const user = await UserModel.findOneAndDelete({ _id: id });
    if (user && profile) {
      await PostModel.deleteMany({ user: id });
      await profile.remove();
      await user.remove();
      return res.status(202).json({
        ...response,
        success: true,
        status: "Deleted",
        statusCode: 202,
      });
    } else {
      return res.status(404).json({
        ...response,
        errors: ["user or profile are not exist"],
        status: "Not Found",
        statusCode: 404,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
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
          ...response,
          success: true,
          status: "Updated",
          statusCode: 203,
          data: [profile],
        });
      } else {
        res.status(404).json({
          ...response,
          errors: ["profile is not exist"],
          status: "Not Found",
          statusCode: 404,
        });
      }
    } else {
      return res.status(400).json({
        ...response,
        errors: errors.array(),
      });
    }
  } catch (error) {
    res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
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
          ...response,
          success: true,
          status: "Deleted",
          statusCode: 202,
          data  : [profile]
        });
      }
      return res.status(404).json({
        ...response,
        errors: ["Experience is not exist"],
        status: "Not Found",
        statusCode: 404,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
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
          ...response,
          success: true,
          status: "Updated",
          statusCode: 203,
          data: [profile],
        });
      } else {
        res.status(404).json({
          ...response,
          errors: ["profile is not exist"],
          status: "Not Found",
          statusCode: 404,
        });
      }
    }
    return res.status(400).json({
      ...response,
      errors: errors.array(),
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
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
          ...response,
          success: true,
          status: "Deleted",
          statusCode: 202,
          data : [profile]
        });
      }
      return res.status(404).json({
        ...response,
        errors: ["there is no such education"],
        status: "Not Found",
        statusCode: 404,
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
          ...response,
          errors: ["Github Username Not Found"],
          status: "Not Found",
          statusCode: 404,
        });
      }
      return res.status(200).json({
        ...response,
        success: true,
        status: "OK",
        statusCode: 200,
        data: JSON.parse(body),
      });
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      errors: [err.message],
      status: "Server Error",
      statusCode: 500,
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
  getProfileGithubRepos,
};
