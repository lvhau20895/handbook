import express from "express";
import cors from "cors";
import chalk from "chalk";
import connectDatabase from "./Configs/connect.database";
import router from "./Routers";

const app = express();
const port = 1995;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các nguồn
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
app.use(express.json());
app.use(express.static("."));
app.use(cors());
app.use("/api", router);

app.get("/", (_, res) => {
	res.send("Server running...");
});

app.listen(port, () => {
	connectDatabase();
	console.log(chalk.blueBright(`http://localhost:${port}`));
});
