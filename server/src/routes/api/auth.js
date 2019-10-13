const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   GET api/auth
// @desc    return user data after authorization
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
