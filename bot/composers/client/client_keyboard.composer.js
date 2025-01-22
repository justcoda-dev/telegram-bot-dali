import { Composer } from "telegraf";
import { CLIENT_KEYBOARD_ID } from "../../keyboards/keyboard/keyboard_id.js";
import { client_keyboard } from "../../keyboards/keyboard/client_create_task.keyboard.js";
import { emoji } from "../../emoji.js";

export const client_keyboard_composer = new Composer();

client_keyboard_composer.command("start", async (ctx) => {
  try {
    ctx.reply(`Вітаю  CLIENT_ID клієнт ${emoji.done}`, client_keyboard);
  } catch (error) {
    console.error(error);
    ctx.reply(`Вітаю  CLIENT_ID клієнт ${emoji.done}`, client_keyboard);
  }
});
client_keyboard_composer.hears(CLIENT_KEYBOARD_ID.CREATE_TASK, (ctx) => {
  ctx.scene.enter(CLIENT_KEYBOARD_ID.CREATE_TASK);
});
