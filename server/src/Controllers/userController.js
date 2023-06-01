const { User } = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const { failCode, successCode, errorCode } = require("../Utils/response");
const { generateToken } = require("../Utils/jwt");

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
            password: bcrypt.hashSync(password, 10),
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
        const user = await User.findOne({ username });
        if (!user) return failCode(res, "username do not exists");
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) return failCode(res, "incorrect password");
        const token = generateToken({ id: user._id, role: user.role });
        successCode(res, "login success", token);
    } catch (error) {
        errorCode(res, "error: " + error);
    }
};

const getUser = async (req, res) => {
    const data = await User.find();
    successCode(res, "ok", data);
};

module.exports = { register, login, getUser };
