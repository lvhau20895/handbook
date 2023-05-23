const { User } = require("../Models/userSchema");
const { failCode, successCode, errorCode } = require("../Utils/response");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return failCode(res, "not found");
        const data = await User.findOne().or([{ username }, { email }]);
        if (data) return failCode(res, "user exists");
        const id = (Math.random() + 1).toString(36).substring(2).toUpperCase();
        const user = { _id: id, username, email, password };
        const result = await User.create(user);
        successCode(res, "ok", result);
    } catch (error) {
        errorCode(res, "error");
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ $and: [{ username }, { password }] });
        if (user) res.send(user);
        res.send("not found");
    } catch (error) {}
};

module.exports = { register, login };
