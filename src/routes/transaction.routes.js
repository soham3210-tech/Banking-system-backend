const express = require("express");
const router = express.Router();

const {
  transferMoneyController,
} = require("../controllers/transaction.controller");


/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Transfer money from one account to another
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *               - receiverId
 *               - amount
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: 66a12bc34de567890
 *               receiverId:
 *                 type: string
 *                 example: 66a12bc34de567891
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Transaction successful
 *       400:
 *         description: Invalid transaction details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sender or receiver account not found
 */
router.post("/transfer", transferMoneyController);


module.exports = router;