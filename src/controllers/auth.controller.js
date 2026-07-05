const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const { sendRegistrationEmail } = require("../services/email.service");

const jwtSecret = process.env.JWT_SECRET || process.env.jwt_secret;

/**
 * REGISTER
 */
async function userRegisterController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      password,
    });

    try {
      await sendRegistrationEmail(user);
    } catch (error) {
      console.log(error.message);
    }

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
}

/**
 * LOGIN
 */
async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email or password is INVALID",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email or password is INVALID",
      });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

/**
 * LOGOUT
 */
async function userLogoutController(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
};


/*
User authentication controller:

- Imports user model, JWT library, and email service
- Loads JWT secret from environment variables

REGISTER:
- Creates a new user in the database from request body (name, email, password)
- Sends registration email (fails silently if email fails)
- Returns success response with created user

LOGIN:
- Finds user by email and includes password field
- Validates if user exists
- Compares entered password with stored password
- If valid, generates JWT token (expires in 3 days)
- Sets token in cookie
- Returns user data and token

LOGOUT:
- Clears authentication token cookie
- Returns logout success response
*/