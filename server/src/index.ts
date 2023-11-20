import express from "express";
import cors from "cors";
import chalk from "chalk";
import connectDatabase from "./Configs/connect.database";
import router from "./Routers";

const app = express();
const port = 1995;

app.use(cors());
app.use(express.json());
app.use(express.static("."));
app.use("/api", router);

app.get("/", (_, res) => {
	res.send("Server running...");
});

connectDatabase();

app.listen(port, () => {
	console.log(chalk.blueBright(`http://localhost:${port}`));
});
