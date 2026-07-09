## 🚀 Live API Documentation

You can explore and test all available API endpoints using Swagger UI:

🔗 Swagger Documentation:
https://banking-system-backend-ndzf.onrender.com/api-docs

The Swagger interface allows you to:
- View all available routes
- Test API requests and responses
- Authenticate using JWT Bearer tokens
- Explore authentication, accounts, deposits, and transaction APIs










# Banking System Backend

Lightweight backend for a simple banking system built with Node.js, Express, and MongoDB (Mongoose).

## Tech
- Node.js
- Express
- MongoDB (Mongoose)

## Features
- User authentication routes mounted at `/api/auth`
- Account management at `/api/accounts`
- Transactions and transfers at `/api/transaction`
- Deposits at `/api/deposit`

## Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- npm

## Quick start

1. Install dependencies
2. Create a `.env` file in the project root with at least:
MONGO_URI=mongodb://localhost:27017/banking PORT=3000
3. start the server
node server.js

Code:

The app will load environment variables, connect to MongoDB, then start an HTTP server on the configured port (default 3000).

## API overview (example endpoints)
- `POST /api/auth/register` — register a user  
- `POST /api/auth/login` — login  
- `POST /api/accounts` — create a new account (authenticated)  
- `GET /api/accounts` — list authenticated user’s accounts  
- `GET /api/accounts/:accountId/balance` — get account balance  
- `POST /api/transaction/transfer` — transfer money between accounts
See `src/routes` and `src/controllers` for exact request payloads and behavior.


## Notes & recommendations
- Balances are calculated from the `Ledger` collection via MongoDB aggregation (audit-friendly). The account model does NOT store a mutable balance field.
- For production:
- Use `process.env.PORT` instead of hardcoding.
- Wait for a successful DB connection before calling `app.listen`.
- Add proper error handling, logging, and graceful shutdown (close DB connections on exit).
- Secure environment variables and secrets (do not commit `.env`).

## Development tips
- Inspect route files in `src/routes` to learn endpoints and controllers.
- Controllers in `src/controllers` perform business logic and use models in `src/models`.
- Add indexes (e.g., on ledger.account) for performance with large data.

## Contributing
PRs and issues are welcome. For local development, run the server and modify files under `src/`.

