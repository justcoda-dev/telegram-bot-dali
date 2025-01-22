import { Composer } from "telegraf";
import { admin_inline_composer } from "./admin_inline_keyboard.composer.js";
import { admin_keyboard_composer } from "./admin_keyboard.composer.js";

export const admin_composer = new Composer();
admin_composer.use(admin_inline_composer);
admin_composer.use(admin_keyboard_composer);
