const express = require("express");
const { login } = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", login);

module.exports = userRouter;
