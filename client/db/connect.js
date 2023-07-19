const mongoose = require("mongoose");

const connectDB = (uri) => {
  console.log("Connection Successfully With DB 👍👍");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
