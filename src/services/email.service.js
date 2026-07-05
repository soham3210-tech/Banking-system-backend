const transporter = require("../config/transporter.js");

const sendRegistrationEmail = async (user) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Welcome to ABC Bank",
    html: `
            <h2>Welcome ${user.name}</h2>
            <p>Your account has been created successfully.</p>
        `,
  });
};

const sendTransactionSuccessEmail = async (user, amount, receiver) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Transaction Successful",
    html: `
            <h2>Transaction Successful</h2>
            <p>Hello ${user.name}</p>
            <p>You have successfully transferred Rs ${amount} to ${receiver}.</p>
        `,
  });
};

const sendTransactionFailureEmail = async (user, amount, reason) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Transaction Failed",
    html: `
            <h2>Transaction Failed</h2>
            <p>Hello ${user.name}</p>
            <p>Your transaction of Rs ${amount} could not be completed.</p>
            <p>Reason: ${reason}</p>
        `,
  });
};

module.exports = {
  sendRegistrationEmail,
  sendTransactionSuccessEmail,
  sendTransactionFailureEmail,
};
/*
Email service:

- Imports the configured Nodemailer transporter
- Sends a welcome email after successful user registration
- Sends a confirmation email after a successful transaction
- Sends a notification email when a transaction fails with the failure reason
- Exports all email functions for use in controllers
*/