const express = require("express");

const {
  registerUserController,
  loginUserController,
  LogoutUserController,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a new user
 * @access Public
 */

authRouter.post("/login", loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Logout a user and also blacklist token
 * @access Public
 */

authRouter.get("/logout",LogoutUserController);

module.exports = authRouter;
