import { Router } from "express";
import { forgot, login, register } from "../Controllers/user.controller";
import privateAPI from "../Middlewares/privateAPI";

const userRouter = Router();

userRouter.post("/register", privateAPI, register);
userRouter.post("/login", privateAPI, login);
userRouter.post("/forgot", privateAPI, forgot);

export default userRouter;
