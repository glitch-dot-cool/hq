const express = require("express");
const router = express.Router();

const b2 = require("../../b2");
const auth = require("../../middleware/auth");

// @route GET api/files
// @desc list all files in B2 bucket
// @access Private
// @TODO display alert in try/catch error

router.get("/", auth, async (req, res) => {
  try {
    const fileList = await b2.listFiles();
    console.log(fileList);
    res.json(fileList);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
