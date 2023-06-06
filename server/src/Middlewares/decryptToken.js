const { checkBearerToken } = require("../Utils/jwt");
const { failCode, errorCode } = require("../Utils/response");

const decryptToken = (req, res, next) => {
	const bearerToken = req.headers["authorization"];
	try {
		if (!bearerToken) return failCode(res, "token bearer not found");
		const result = checkBearerToken(bearerToken);
		req.user = result;
		next();
	} catch (error) {
		errorCode(res, error.message);
	}
};

module.exports = decryptToken;
