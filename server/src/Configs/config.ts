import dotenv from "dotenv";

dotenv.config();

const config = {
	database: {
		dialect: process.env.DATABASE_DIALECT,
		name: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		code: process.env.DATABASE_CODE
	},

	keyToken: {
		keyRefresh: process.env.KEY_REFRESH_TOKEN,
		keyAccess: process.env.KEY_ACCESS_TOKEN
	},

	sendMail: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
};

export default config;
