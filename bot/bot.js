import { Telegraf } from "telegraf";
import { configDotenv } from "dotenv";
configDotenv();
export const bot = new Telegraf(process.env.BOT_TOKEN);
