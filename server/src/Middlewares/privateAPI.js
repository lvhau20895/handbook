const { checkToken } = require("../Utils/jwt");
const { errorCode } = require("../Utils/response");

const privateAPI = (req, res, next) => {
    const { Token } = req.headers;
    const bearerToken = req.headers["authorization"];
    try {
        const result = checkToken(Token, bearerToken);
        req.user = result;
        next();
    } catch (error) {
        errorCode(res, error.message);
    }
};

module.exports = privateAPI;
