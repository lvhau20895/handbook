const jwt = require("jsonwebtoken");
const { key } = require("../Configs/config");
const { successCode, errorCode } = require("./response");

const lock = "lvh-20081995";
const tokenAdmin = () => {
	const token = jwt.sign({ l: "le", v: "van", h: "hau" }, lock, {
		algorithm: "HS256",
		expiresIn: "100d"
	});
	return token;
};

const generateToken = data => {
	const token = jwt.sign(data, key, { algorithm: "HS256", expiresIn: "5s" });
	return token;
};

const checkToken = token => {
	jwt.verify(token, lock);
};

const checkBearerToken = bearerToken => {
	bearerToken = bearerToken.split(" ")[1];
	const data = jwt.verify(bearerToken, key);
	return data;
};

const decodeToken = token => {
	return jwt.decode(token);
};

const refreshToken = (req, res) => {
	let bearerToken = req.headers["authorization"];

	try {
		checkBearerToken(bearerToken);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			const result = decodeToken(bearerToken.split(" ")[1]);
			const newToken = generateToken({
				id: result.id,
				role: result.role
			});
			return successCode(res, "refresh token success", newToken);
		}
		return errorCode(res, "error: " + error);
	}
};

module.exports = {
	tokenAdmin,
	generateToken,
	checkToken,
	checkBearerToken,
	decodeToken,
	refreshToken
};
