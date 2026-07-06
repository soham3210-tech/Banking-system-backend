const express = require("express");
const router = express.Router();

const {
  transferMoneyController,
} = require("../controllers/transaction.controller");

// POST /api/transactions/transfer
// Transfer money from one account to another
router.post("/transfer", transferMoneyController);

module.exports = router;

/*
Steps:
1. Import Express and create a router.
2. Import the transaction controller.
3. Define the POST route for money transfer.
4. Export the router so it can be used in app.js.
*/
