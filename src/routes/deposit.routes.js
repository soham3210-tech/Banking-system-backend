const express = require("express");
const router = express.Router();

const { depositController } = require("../controllers/deposit.controller");

/**
 * @swagger
 * /api/deposit:
 *   post:
 *     summary: Deposit money into an account
 *     tags:
 *       - Deposit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountId
 *               - amount
 *             properties:
 *               accountId:
 *                 type: string
 *                 example: 66a12bc34de567890
 *               amount:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Invalid deposit amount
 *       404:
 *         description: Account not found
 */
router.post("/", depositController);

module.exports = router;
