import { Request, Response, NextFunction } from "express";
import { checkToken, generateRefreshToken } from "../Utils/jwt";
import { errorCode, failCode } from "../Utils/response";

type Token = { token: string };

const privateAPI = (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.headers as Token;
	try {
		if (!token) return failCode(res, "The token does not exist");
		checkToken(token);
		next();
	} catch (error: any) {
		errorCode(res, error.message);
	}
};

export default privateAPI;
