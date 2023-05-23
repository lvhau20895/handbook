const express = require("express");
const { register, login } = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = userRouter;
