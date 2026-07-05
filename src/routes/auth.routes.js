const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// REGISTER
router.post("/register", authController.userRegisterController);

// LOGIN
router.post("/login", authController.userLoginController);

// LOGOUT
router.post("/logout", authController.userLogoutController);

module.exports = router;


/*
Creates an Express router and connects authentication routes:
- Imports Express 
- create router instance with express
- Imports authentication controller
- Defines POST /register route for user registration
- Defines POST /login route for user login
- Defines POST /logout route for user logout
- Exports the router to be used in the main app
*/