require("dotenv").config();
const connectToDB = require("./src/config/db");
connectToDB();

const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});


/*
Initializes the server:
- Loads environment variables using dotenv
- Connects to the database
- Imports the Express app
- Starts the server on port 3000
*/