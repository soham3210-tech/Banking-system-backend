const express = require("express");
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const depositRoutes = require("./routes/deposit.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter); // this authRouter function automatically does is that it make the route name api/auth/register or login or logout
app.use("/api/accounts", accountRouter); /// this accountrouter function automatically does is that it make the route name api/accounts/
app.use("/api/transaction", transactionRoutes); //// this authRouter function automatically does is that it make the route name api/transaction/....
app.use("/api/deposit", depositRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "Banking System API is running",
    status: "success",
  });
});

module.exports = app;

/*
Express app setup:
- Initializes Express application
- Enables JSON request parsing middleware
- Registers authentication and transaction routes
- Exports the configured app for server use
*/
