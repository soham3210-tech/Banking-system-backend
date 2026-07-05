const express = require("express");
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter); // this authRouter function automatically does is that it make the route name api/auth/register or login or logout
app.use("/api/accounts", accountRouter); /// this accountrouter function automatically does is that it make the route name api/accounts/
app.use("/api/transaction", transactionRoutes); //// this authRouter function automatically does is that it make the route name api/transaction/....

module.exports = app;

/*
Express app setup:
- Initializes Express application
- Enables JSON request parsing middleware
- Registers authentication and transaction routes
- Exports the configured app for server use
*/
