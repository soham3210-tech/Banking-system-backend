/*
Token Blacklist Model:

This model stores JWT tokens that are no longer valid (e.g. after user logout).

- When a user logs out, their token is saved here.
- Any request using a blacklisted token is rejected by the server.
- Tokens are automatically deleted after 3 days using TTL index.
- Helps in implementing secure logout and token invalidation in JWT-based authentication.
*/

const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist"],
      unique: [true, "Token is already blacklisted"],
    },
  },
  {
    timestamps: true,
  },
);

tokenBlacklistSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 3, // 3 days
  },
);

const tokenBlackListModel = mongoose.model(
  "tokenBlackList",
  tokenBlacklistSchema,
);

module.exports = tokenBlackListModel;
/*
Token blacklist model:

- Defines a schema to store blacklisted JWT tokens
- Each entry stores a token string with uniqueness validation
- Adds timestamps to track when tokens were blacklisted
- Creates a TTL index on createdAt to automatically delete records after 3 days
- This helps invalidate tokens (logout/security) and automatically clean expired entries
- Exports the Mongoose model for use in authentication middleware/services
*/
