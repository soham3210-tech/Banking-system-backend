const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");
/*
===========================================================
Account Schema
-----------------------------------------------------------
Represents a bank account.

This model does NOT store the account balance.
Instead, every money movement is stored in the Ledger
collection, and the balance is calculated whenever needed.

Benefits:
✔ No risk of inconsistent balances
✔ Complete transaction history
✔ Easy to audit every transaction
===========================================================
*/
const accountSchema = new mongoose.Schema(
  {
    /*
    -------------------------------------------------------
    User Reference
    -------------------------------------------------------
    Stores the ObjectId of the user who owns this account.

    ref: "user"
      -> Creates a relationship with the User collection.

    index: true
      -> Speeds up queries like:
         Account.find({ user: userId })

    required
      -> Every account must belong to a user.
    -------------------------------------------------------
    */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Account must be associated with a user"],
      index: true,
    },

    /*
    -------------------------------------------------------
    Account Status
    -------------------------------------------------------
    Determines whether the account can be used.

    ACTIVE
      -> Account works normally.

    FROZEN
      -> Transactions are temporarily blocked.

    CLOSED
      -> Account has been permanently closed.

    enum
      -> Only these three values are allowed.

    default
      -> Every newly created account starts as ACTIVE.
    -------------------------------------------------------
    */

    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "Status can be either ACTIVE, FROZEN or CLOSED",
      },
      default: "ACTIVE",
    },

    /*
    -------------------------------------------------------
    Account Currency
    -------------------------------------------------------
    Specifies the currency used by the account.
    Example:
      INR
      USD
      NPR

    default
      -> Uses INR if no currency is provided.
    -------------------------------------------------------
    */

    currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: "INR",
    },
  },
  /*
  ---------------------------------------------------------
  timestamps: true

  Automatically adds:

    createdAt
    updatedAt

  Useful for auditing and tracking account creation.
  ---------------------------------------------------------
  */
  {
    timestamps: true,
  },
);
/*
===========================================================
Compound Index
-----------------------------------------------------------
Creates an index using BOTH user and status.

Optimizes queries like:

Account.find({
    user: userId,
    status: "ACTIVE"
})

MongoDB can find matching documents much faster.
===========================================================
*/
accountSchema.index({ user: 1, status: 1 });
/*
===========================================================
Instance Method: getBalance()

Purpose
-------
Calculates the current account balance.

The balance is NOT stored inside the Account collection.

Instead, it is calculated from the Ledger collection:

Balance =
    Total Credits
    -
    Total Debits

Using MongoDB Aggregation keeps the balance accurate even
after thousands of transactions.
===========================================================
*/
accountSchema.methods.getBalance = async function () {
  /*
  ---------------------------------------------------------
  Aggregation Pipeline

  aggregate() performs calculations directly inside MongoDB.

  Pipeline Stages:

  1. $match
     -> Select only ledger entries belonging to this account.

  2. $group
     -> Calculate:
        - Total Credit
        - Total Debit

  3. $project
     -> Compute:
        balance = totalCredit - totalDebit
  ---------------------------------------------------------
  */
  const balanceData = await ledgerModel.aggregate([ 
    /* Select ledger entries for the current account. */
    { $match: { account: this._id } },
    /*
    Group all matching ledger entries into one result.

    _id: null
      -> Creates one group containing all matching documents.
    */
    {
      $group: {
        _id: null,
        /*
        Add amounts whose type is DEBIT.
        Ignore CREDIT entries.
        */
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "DEBIT"] }, "$amount", 0],
          },
        },
        /*
        Add amounts whose type is CREDIT.
        Ignore DEBIT entries.
        */
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "CREDIT"] }, "$amount", 0],
          },
        },
      },
    },
    /*
    Shape the final output.

    Example Output:

    {
        balance: 8500
    }

    _id is removed because it is not needed.
    */
    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$totalCredit", "$totalDebit"] },
      },
    },
  ]);
  /*
  If no ledger entries exist,
  the account balance is zero.
  */
  if (balanceData.length === 0) {
    return 0;
  }

  /*
  Return the calculated balance.
  */
  return balanceData[0].balance;
};

/*
===========================================================
Create Model

Creates the Account model using the schema.

Available methods include:

Account.create()
Account.find()
Account.findById()
Account.deleteOne()

===========================================================
*/

const accountModel = mongoose.model("account", accountSchema);

/*
Export the Account model so it can be used in
controllers, services, and routes.
*/
module.exports = accountModel;
/* require
 1)mongoose 
 2)ledgerModel 
 3)accountschema 
 4)accountSchema
 5) accountschema.methods.getBalance
 6) accountModel
 7) export accountModel
 */
