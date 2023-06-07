const { checkToken } = require("../Utils/jwt");
const { errorToken } = require("../Utils/response");

const privateAPI = (req, res, next) => {
	const { token } = req.headers;
	try {
		checkToken(token);
		next();
	} catch (error) {
		errorToken(res, error.message);
	}
};

module.exports = privateAPI;
