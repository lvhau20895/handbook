import { Response } from "express";

type ParamResponse = <T>(res: Response, message: string, data?: T | "") => void;

const successCode: ParamResponse = (res, message, data) => {
	res.status(200).json({
		statusCode: 200,
		message,
		result: data
	});
};

const failCode: ParamResponse = (res, message) => {
	res.status(400).json({
		statusCode: 400,
		message
	});
};

const errorCode: ParamResponse = (res, message) => {
	res.status(500).json({
		statusCode: 500,
		message
	});
};

export { successCode, failCode, errorCode };
