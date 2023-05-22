const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const server = require("http").createServer;
const socket = require("./socket");
const connectDatabase = require("../Configs/connect");
const router = require("../Routers");

const app = express();
const port = 1995;

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req, res) => {
	res.send("hello world");
});

const http = server(app);
socket(http);

connectDatabase();

http.listen(port, () => {
	console.log(chalk.blueBright(`http://localhost:${port}`));
});
