require("dotenv").config();
const connectToDB = require("./src/config/db");
connectToDB();

const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
