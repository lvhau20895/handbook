const express = require("express");
const {
    register,
    login,
    forgot,
    getUser,
} = require("../Controllers/userController");
const privateAPI = require("../Middlewares/privateAPI");
const decryptToken = require("../Middlewares/decryptToken");

const userRouter = express.Router();

userRouter.post("/register", privateAPI, register);
userRouter.post("/login", privateAPI, login);
userRouter.post("/forgot", privateAPI, forgot);
userRouter.get("/get-user", privateAPI, decryptToken, getUser);

module.exports = userRouter;
