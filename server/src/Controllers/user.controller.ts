import { Request, Response } from "express";
import User, { IUser } from "../Models/user.model";
import { IProfile } from "../Models/profile.model";
import { errorCode, failCode, successCode } from "../Utils/response";
import { generateAccessToken } from "../Utils/jwt";
import bcrypt from "bcrypt";
import sendMail from "../Utils/nodemailer";

type ValueFormRegister = Pick<IUser, "username" | "email" | "password">;
type ValueFormLogin = Pick<IUser, "username" | "password">;
type ValueFormForgot = Pick<IUser, "email">;

export const register = async (req: Request, res: Response) => {
	const values: ValueFormRegister = req.body;
	for (const key in values) {
		if (!values.hasOwnProperty(key)) {
			return failCode(res, `${key} not found`);
		}
	}
	try {
		const { username, email, password } = values;
		const checkUsername = await User.findOne({ username });
		const checkEmail = await User.findOne({ email });
		if (checkUsername) return failCode(res, "Username already in use");
		if (checkEmail) return failCode(res, "Email already in use");
		const profile: IProfile = {
			nickname: "",
			avatar: "",
			background: "",
			phone: "",
			address: "",
			dayOfBirth: new Date(),
			coin: 0
		};
		const user: IUser = {
			username,
			email,
			password: bcrypt.hashSync(password, 10),
			profiles: profile,
			groups: []
		};
		await User.create(user);
		successCode(res, "sign up success");
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password }: ValueFormLogin = req.body;
	try {
		const checkUser = await User.findOne({ username });
		if (!checkUser) return failCode(res, "User does not exist");
		const checkPassword = bcrypt.compareSync(password, checkUser.password);
		if (!checkPassword) return failCode(res, "incorrect password");
		const token = generateAccessToken({
			id: checkUser._id,
			role: checkUser.role
		});
		successCode(res, "login success", token);
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};

export const forgot = async (req: Request, res: Response) => {
	const { email }: ValueFormForgot = req.body;

	try {
		const checkEmail = await User.findOne({ email });
		if (!checkEmail) return failCode(res, "email does not exists");
		const newPassword = Math.floor(Math.random() * (999999 - 100000) + 100000);
		await sendMail(email, newPassword);
		await User.updateOne(
			{ email: checkEmail.email },
			{ $set: { password: bcrypt.hashSync(newPassword.toString(), 10) } }
		);
		successCode(res, "successfully");
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};
