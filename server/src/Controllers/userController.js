const { User } = require("../Models/userSchema");
const { fail, success } = require("../Utils/response");

const login = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (!username || !email || !password) return fail(res, "not found");
		const data = await User.find().or([{ username }, { email }]);
		if (data) return success(res, "", data);
	} catch (error) {}
	// const id = (Math.random() + 1).toString(36).substring(2).toUpperCase();
	// const user = new User({ _id: id, username, email, password });
	// const data = await User.create(user);
	// success(res, "ok", data);
};

module.exports = { login };
