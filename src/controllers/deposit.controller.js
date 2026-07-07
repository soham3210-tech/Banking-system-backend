const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");

async function depositController(req, res) {
  try {
    const { accountId, amount } = req.body;

    // Create transaction
    const transaction = await transactionModel.create({
      fromAccount: accountId, // temporary for testing
      toAccount: accountId,
      amount,
      status: "COMPLETED",
      idempotencyKey: Date.now().toString(),
    });

    // Create ledger entry
    await ledgerModel.create({
      account: accountId,
      amount,
      type: "CREDIT",
      transaction: transaction._id,
    });

    res.json({
      message: "Deposit successful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  depositController,
};
