const mongoose = require("mongoose");

function connecttodb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("server is connected to db");
    })
    .catch((err) => {
      console.log("failed ");
      process.exit(1);
    });
}
module.exports = connecttodb;
