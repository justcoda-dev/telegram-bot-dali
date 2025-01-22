import express from "express";
import { configDotenv } from "dotenv";
import bot from "./bot/index.js";

const dotEnv = configDotenv();
const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Applicaion started on port ${port}. http://localhost:${port}`);
});
bot.launch();
