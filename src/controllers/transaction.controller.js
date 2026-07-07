const accountModel = require("../models/account.model");
const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const crypto = require("crypto");

async function transferMoneyController(req, res) {
    try {
        const { fromAccount, toAccount, amount } = req.body;

        // find accounts
        const senderAccount = await accountModel.findById(fromAccount);
        const receiverAccount = await accountModel.findById(toAccount);

        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({
                message: "Sender or Receiver account not found"
            });
        }


        // check sender balance
        const senderBalance = await senderAccount.getBalance();

        if (senderBalance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }


        // create transaction
        const transaction = await transactionModel.create({
            fromAccount,
            toAccount,
            amount,
            status: "COMPLETED",
            idempotencyKey: crypto.randomUUID()
        });


        // sender debit entry
        await ledgerModel.create({
            account: fromAccount,
            amount,
            transaction: transaction._id,
            type: "DEBIT"
        });


        // receiver credit entry
        await ledgerModel.create({
            account: toAccount,
            amount,
            transaction: transaction._id,
            type: "CREDIT"
        });


        const updatedBalance = await senderAccount.getBalance();


        res.status(200).json({
            message: "Transaction successful",
            senderBalance: updatedBalance
        });


    } catch (error) {
        res.status(500).json({
            message: "Transaction failed",
            error: error.message
        });
    }
}


module.exports = {
    transferMoneyController
};