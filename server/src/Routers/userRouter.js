const express = require("express");
const { register, login, getUser } = require("../Controllers/userController");
const privateAPI = require("../Middlewares/privateAPI");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-user", privateAPI, getUser);

module.exports = userRouter;
