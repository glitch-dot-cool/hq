const express = require("express");
const connectToDB = require("../config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));

connectToDB();

app.get("/", (req, res) => {
  res.send("hello world");
});
