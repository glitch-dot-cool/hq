const express = require("express");
const connectToDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));

connectToDB();

app.use(express.json({extended: false}));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/files", require("./routes/api/files"));