require("dotenv").config();
const connectToDB = require("./src/config/db");
connectToDB();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
Initializes the server:
- Loads environment variables using dotenv
- Connects to the database
- Imports the Express app
- Starts the server on port 3000
*/
