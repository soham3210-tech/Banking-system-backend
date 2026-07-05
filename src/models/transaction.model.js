const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction must be associated with a from account"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction must be associated with a to account"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Status can be either PENDING, COMPLETED, FAILED or REVERSED",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required for creating a transaction"],
      min: [0, "Transaction amount cannot be negative"],
    },
    idempotencyKey: {
      type: String,
      required: [
        true,
        "Idempotency Key is required for creating a transaction",
      ],
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
/*
Transaction model:

- Defines schema for money transfer transactions between accounts
- Stores sender account (fromAccount) and receiver account (toAccount)
- Tracks transaction status: PENDING, COMPLETED, FAILED, or REVERSED
- Stores transaction amount with validation to prevent negative values
- Uses idempotencyKey to prevent duplicate transactions (ensures uniqueness)
- Adds indexes on account fields for faster query performance
- Enables timestamps to track creation and update time
- Exports the transaction model for database operations
*/