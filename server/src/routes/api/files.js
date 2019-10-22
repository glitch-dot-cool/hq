const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const b2 = require("../../b2Server");
const encryption = require("../../encryption");
const auth = require("../../middleware/auth");

// @route GET api/files
// @desc list all files in B2 bucket
// @access Private
// @TODO display alert in try/catch error

router.get("/", auth, async (req, res) => {
  try {
    const fileList = await b2.listFiles();
    res.json(fileList);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

// @route GET api/files/auth
// @desc generate b2 api key, encrypt, and send to client
// @access Private
// @TODO display alert in try/catch error

router.get("/auth", auth, async (req, res) => {
  try {
    const b2Key = await b2.createKey(req.user.id);
    const b2Auth = await b2.getClientAuth(b2Key);

    const key = req.headers["x-auth-token"].substring(0, 32);
    const encrypted = encryption.encrypt(key, b2Auth);

    res.json({ encrypted });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
