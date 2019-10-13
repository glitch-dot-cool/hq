const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    const errors = validationResult(req).errors;

    if (errors.length) {
      return res.status(400).json({ errors });
    } else {
      return res.status(200).send("passed validation");
    }
  }
);

module.exports = router;
