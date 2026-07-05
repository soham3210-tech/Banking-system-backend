const userModel = require("../models/user.model");

const {
  sendTransactionSuccessEmail,
  sendTransactionFailureEmail,
} = require("../services/email.service");

/**
 * TRANSFER MONEY
 */
async function transferMoneyController(req, res) {
  console.log("➡️ Transaction reached controller");

  try {
    const { senderId, receiverId, amount } = req.body;

    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({
        message: "Sender or Receiver not found",
      });
    }

    if (sender.balance < amount) {
      try {
        await sendTransactionFailureEmail(
          sender,
          amount,
          "Insufficient Balance",
        );
      } catch (emailErr) {
        console.log(emailErr.message);
      }

      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // 💸 perform transaction
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // ✅ send success email

    try {
      console.log("SENDING EMAIL TO:", sender.email); // 👈 PUT IT HERE

      await sendTransactionSuccessEmail(sender, amount, receiver.name);
      console.log("➡️ SUCCESS email SENT");
    } catch (emailErr) {
      console.log(emailErr.message);
    }

    return res.status(200).json({
      message: "Transaction successful",
      senderBalance: sender.balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  }
}

module.exports = {
  transferMoneyController,
};



/*
Transaction controller:

- Imports the user model and transaction email service functions
- Handles money transfer requests between users
- Retrieves sender, receiver, and transfer amount from the request
- Verifies that both sender and receiver exist
- Checks if the sender has sufficient balance
- Sends a failure email if the transaction cannot be completed due to insufficient balance
- Transfers the amount by updating both users' account balances
- Saves the updated balances to the database
- Sends a success email after a successful transaction
- Returns the transaction result or an error response
*/