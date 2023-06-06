const express = require("express");
const {
    register,
    login,
    forgot,
    getUser,
} = require("../Controllers/userController");
const privateAPI = require("../Middlewares/privateAPI");

const userRouter = express.Router();

userRouter.post("/register", privateAPI, register);
userRouter.post("/login", privateAPI, login);
userRouter.post("/forgot", privateAPI, forgot);
userRouter.get("/get-user", privateAPI, getUser);

module.exports = userRouter;
