const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = require("../../config/serverConfig").jwtSecret;
const User = require("../../models/User");

// @route   POST api/users
// @desc    register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req).errors;

    if (errors.length) {
      return res.status(400).json({ errors });
    } else {
      const { name, email, password, createdAt } = req.body;

      try {
        // check if user exists
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        // instantiate user object
        user = new User({
          name,
          email,
          password,
          createdAt
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user to db
        await user.save();

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
