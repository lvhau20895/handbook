import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config";

const { username, password, name, code, dialect } = config.database;

const url = `mongodb+srv://${username}:${password}@handbook.${code}.${dialect}.net/${name}?retryWrites=true&w=majority`;

const connectDatabase = async () => {
	try {
		await mongoose.connect(url);
		console.log(chalk.blueBright("Connect database success"));
	} catch (error) {
		console.log(chalk.redBright(error));
	}
};

export default connectDatabase;
