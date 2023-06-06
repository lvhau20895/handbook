const express = require("express");
const userRouter = require("./userRouter");
const { refreshToken } = require("../Utils/jwt");
const privateAPI = require("../Middlewares/privateAPI");

const router = express.Router();

router.get("/refresh-token", privateAPI, refreshToken);
router.use("/user", userRouter);

module.exports = router;
