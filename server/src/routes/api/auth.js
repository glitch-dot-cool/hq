const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = require("../../config/serverConfig").jwtSecret;
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

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req).errors;

    if (errors.length) {
      return res.status(400).json({ errors });
    } else {
      const { email, password } = req.body;

      try {
        // check if user exists
        let user = await User.findOne({ email });

        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // return JWT
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;

            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error.");
      }
    }
  }
);

module.exports = router;
