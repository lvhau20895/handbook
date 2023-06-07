const { checkBearerToken } = require("../Utils/jwt");
const { failCode, successCode, errorToken } = require("../Utils/response");

const decryptToken = (req, res, next) => {
	const bearerToken = req.headers["authorization"];
	try {
		if (!bearerToken) return failCode(res, "token bearer not found");
		const result = checkBearerToken(bearerToken);
		req.user = result;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return successCode(res, error.message, "");
		}
		return errorToken(res, error.message);
	}
};

module.exports = decryptToken;
