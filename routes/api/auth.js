const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const userModel = require("../../models/user.model");
const response = require("../../controllers/response");

//@route api/auth
//@desc  test routes
//@access Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id).select("-password");
    if (user) {
      res.status(200).json({
        ...response,
        success: true,
        data: [user],
        status: "OK",
        statusCode: 200,
      });
    } else {
      res.status(401).json({
        ...response,
        status: "Unauthorized",
        statusCode: 401,
        errors: ["this user is not authorized"],
      });
    }
  } catch (err) {
    res.status(500).json({
      ...response,
      status: "Server Error",
      statusCode: 500,
      errors: ["err.message"],
    });
  }
});

module.exports = router;
