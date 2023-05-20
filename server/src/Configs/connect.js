const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("./config");

const connectDatabase = async () => {
	try {
		await mongoose.connect(
			`${config.dialect}+srv://${config.username}:${config.password}@cluster0.${config.code}.mongodb.net/${config.database}?retryWrites=true&w=majority`
		);
		console.log(chalk.blueBright("connect database success!"));
	} catch (error) {
		console.log(chalk.redBright(error));
	}
};

module.exports = connectDatabase;
