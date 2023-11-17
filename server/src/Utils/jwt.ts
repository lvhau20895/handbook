import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import { errorCode, failCode, successCode } from "./response";
import config from "../Configs/config";

interface SecretKey<T> {
	keyRefresh: T;
	keyAccess: T;
}

const { keyRefresh, keyAccess } = config.keyToken as SecretKey<Secret>;

const generateRefreshToken = () => {
	const refreshToken = jwt.sign({ l: "le", v: "van", h: "hau" }, keyRefresh, {
		algorithm: "HS256",
		expiresIn: "100d"
	});
	return refreshToken;
};

const generateAccessToken = (data: JwtPayload) => {
	const accessToken = jwt.sign(data, keyAccess, {
		algorithm: "HS256",
		expiresIn: "5m"
	});
	return accessToken;
};

const checkBearerToken = (token: string) => {
	const isBearerToken = token.includes("Bearer");
	const result = {
		newToken: isBearerToken ? token.split(" ")[1] : token,
		isBearerToken
	};
	return result;
};

const checkToken = (token: string) => {
	const { isBearerToken, newToken } = checkBearerToken(token);
	return jwt.verify(newToken, isBearerToken ? keyAccess : keyRefresh);
};

const decodeToken = (token: string) => {
	const { newToken } = checkBearerToken(token);
	return jwt.decode(newToken) as JwtPayload;
};

const refreshToken = (req: Request, res: Response) => {
	let accessToken = req.headers["authorization"] as string;
	if (!accessToken) return failCode(res, "bearer token not found");
	try {
		checkToken(accessToken);
	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
			const result = decodeToken(accessToken.split(" ")[1]);
			const newAccessToken = generateAccessToken({
				id: result.id,
				role: result.role
			});
			return successCode<string>(res, "refresh token success", newAccessToken);
		}
		return errorCode(res, "error: " + error);
	}
};

export { generateRefreshToken, generateAccessToken, checkToken, decodeToken, refreshToken };
