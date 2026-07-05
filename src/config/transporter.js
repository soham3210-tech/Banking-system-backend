const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : "",// trim remove the beginning and last space 
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : "",// Uses EMAIL_PASS from environment variables if available, trims extra spaces,// otherwise falls back to an empty string.  },
}
});

module.exports = transporter;

