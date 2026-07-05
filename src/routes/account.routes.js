const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")


const router = express.Router()



/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)


/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)


/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)



module.exports = router

/*
Account routes:

- Creates an Express router for account-related endpoints
- Imports authentication middleware to protect routes
- Imports account controller functions

Routes:
- POST /api/accounts/
  → Creates a new account for the logged-in user (protected route)

- GET /api/accounts/
  → Fetches all accounts belonging to the logged-in user (protected route)

- GET /api/accounts/balance/:accountId
  → Fetches balance of a specific account if it belongs to the logged-in user (protected route)

- Exports the router for use in the main application
*/