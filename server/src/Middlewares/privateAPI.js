const { checkToken } = require("../Utils/jwt");
const { errorCode } = require("../Utils/response");

const privateAPI = (req, res, next) => {
	const { token } = req.headers;
	try {
		checkToken(token);
		next();
	} catch (error) {
		errorCode(res, error.message);
	}
};

module.exports = privateAPI;
