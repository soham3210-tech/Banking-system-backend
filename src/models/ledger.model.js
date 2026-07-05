const mongoose = require('mongoose');


const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "Ledger must be associated with an account" ],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [ true, "Amount is required for creating a ledger entry" ],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [ true, "Ledger must be associated with a transaction" ],
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            values: [ "CREDIT", "DEBIT" ],
            message: "Type can be either CREDIT or DEBIT",
        },
        required: [ true, "Ledger type is required" ],
        immutable: true
    }
})


function preventLedgerModification() {
    throw new Error("Ledger entries are immutable and cannot be modified or deleted");
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);


const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel;


/*
Ledger model:

- Defines a ledger schema to record all account transactions
- Each ledger entry is linked to:
  - an account (ObjectId reference)
  - a transaction (ObjectId reference)
- Stores transaction amount and type (CREDIT or DEBIT)
- All fields are immutable to prevent modification after creation
- Adds indexes on account and transaction for faster queries
- Implements strict protection by blocking all update and delete operations
  using Mongoose pre-hooks (ensures ledger entries cannot be changed or removed)
- Exports the ledger model for database operations
*/