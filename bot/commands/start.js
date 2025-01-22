import { admin_keyboard } from "../keyboards/keyboard/admin.keyboard.js";

export const start = async (ctx) => {
  ctx.reply("Вітаю!", admin_keyboard);
};
