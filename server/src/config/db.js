const mongoose = require("mongoose");
const db = require("./serverConfig").mongoURI;

const connectToDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("successfully connected to db...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
