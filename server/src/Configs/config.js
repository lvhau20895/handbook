require("dotenv").config();

module.exports = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	code: process.env.DB_CODE,
	database: process.env.DB_DATABASE,
	dialect: process.env.DB_DIALECT,

	key: process.env.SECRET_KEY,

	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASSWORD
};
