import { Composer } from "telegraf";
import { client_inline_composer } from "./client_inline_keyboard.composer.js";
import { client_keyboard_composer } from "./client_keyboard.composer.js";

export const client_composer = new Composer();
client_composer.use(client_inline_composer);
client_composer.use(client_keyboard_composer);
