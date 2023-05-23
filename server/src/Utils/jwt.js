const jwt = require("jsonwebtoken");
const { key } = require("../Configs/config");

const lock = "lvh-20081995";
const tokenAdmin = () => {
    const token = jwt.sign({ l: "le", v: "van", h: "hau" }, lock, {
        algorithm: "HS256",
        expiresIn: "100d",
    });
    return token;
};

const generateToken = (data) => {
    const token = jwt.sign(data, key, { algorithm: "HS256" });
    return token;
};

const checkToken = (token, bearerToken) => {
    bearerToken = bearerToken.split(" ")[1];
    jwt.verify(token, lock);
    const data = jwt.verify(bearerToken, key);
    return data;
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = { tokenAdmin, generateToken, checkToken, decodeToken };
