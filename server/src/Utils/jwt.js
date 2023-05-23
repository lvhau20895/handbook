const jwt = require("jsonwebtoken");
const { key } = require("../Configs/config");

const lock = "lvh-20081995";
const tokenAdmin = () => {
	return token;
};
const token = jwt.sign({ l: "le", v: "van", h: "hau" }, lock, {
	algorithm: "HS256",
	expiresIn: "10m"
});
console.log(token);

const generateToken = data => {
	const token = jwt.sign(data, key, { algorithm: "HS256", expiresIn: "10m" });
	return token;
};

const checkToken = (token, bearerToken) => {
	bearerToken = bearerToken.split(" ")[1];
	const data = jwt.verify(token, lock);
	const bearer = jwt.verify(bearerToken, key);
	return { data, bearer };
};

const decodeToken = token => {
	return jwt.decode(token);
};

module.exports = { tokenAdmin, generateToken, checkToken, decodeToken };
