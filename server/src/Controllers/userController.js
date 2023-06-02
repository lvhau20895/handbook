const { User } = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const { failCode, successCode, errorCode } = require("../Utils/response");
const { generateToken } = require("../Utils/jwt");
const nodemailer = require("nodemailer");
const { user, pass } = require("../Configs/config");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (!username || !email || !password) return failCode(res, "not found");
		const checkUsername = await User.findOne({ username });
		const checkEmail = await User.findOne({ email });
		if (checkUsername) return failCode(res, "Username exists");
		if (checkEmail) return failCode(res, "Email exists");
		const id = (Math.random() + 1).toString(36).substring(2).toUpperCase();
		const user = {
			_id: id,
			username,
			email,
			password: bcrypt.hashSync(password, 10)
		};
		const result = await User.create(user);
		successCode(res, "ok", result);
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const checkUser = await User.findOne({ username });
		if (!checkUser) return failCode(res, "username do not exists");
		const checkPassword = bcrypt.compareSync(password, checkUser.password);
		if (!checkPassword) return failCode(res, "incorrect password");
		const token = generateToken({
			id: checkUser._id,
			role: checkUser.role
		});
		successCode(res, "login success", token);
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};

const forgot = async (req, res) => {
	const { email } = req.body;
	try {
		const checkUser = await User.findOne({ email });
		if (!checkUser) return failCode(res, "email do not exists");
		const newPassword = Math.floor(
			Math.random() * (999999 - 100000) + 100000
		);
		await User.updateOne(
			{ email: checkUser.email },
			{ $set: { password: bcrypt.hashSync(newPassword.toString(), 10) } }
		);
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: { user, pass }
		});
		await transporter.sendMail({
			from: `'Admin Handbook' <${user}>`,
			to: email,
			subject: "Support Handbook",
			html: `
                <div style="font-family: Arial, Helvetica, sans-serif;">
                    <p>Your temporary password is <strong>"${newPassword}"</strong><p>
                    <a style="display: inline-block; text-decoration: none; background: #3bba99; color: #eee; padding: 20px; border-radius: 5px; font-weight: bold; margin: 30px 0;" href="http://localhost:3000/">Go to Handbook</a>
                </div>
            `
		});
		successCode(res, "successfully", checkUser.updatedAt);
	} catch (error) {
		errorCode(res, "error: " + error);
	}
};

const getUser = async (req, res) => {
	const data = await User.find();
	successCode(res, "ok", data);
};

module.exports = { register, login, forgot, getUser };
