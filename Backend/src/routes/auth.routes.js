const express = require("express");
const {
  LoginUserController,
  LogoutUserController,
  RegisterUserController,
  GetUserController,
} = require("../controllers/auth.controller");

const AuthMiddleware = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */

authRouter.post("/register", RegisterUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access public
 */

authRouter.post("/login", LoginUserController);

/**
 * @route GET /api/auth/logout
 * @description Logout a user and also blacklist token
 * @access public
 */

authRouter.get("/logout", LogoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current login user details
 * @access private
 */

authRouter.get("/get-me", AuthMiddleware, GetUserController);

module.exports = authRouter;
