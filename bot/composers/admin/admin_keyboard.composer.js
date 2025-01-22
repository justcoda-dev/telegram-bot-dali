import { Composer } from "telegraf";
import { ADMIN_KEYBOARD_ID } from "../../keyboards/keyboard/keyboard_id.js";
import { show_clients_handler } from "../../handlers/admin/admin_keyboard_show_clients.handlers.js";
import { admin_keyboard } from "../../keyboards/keyboard/admin.keyboard.js";
import { admin_tasks_show_list_handler } from "../../handlers/admin/admin_keyboard_show_tasks.handlers.js";
import { admin_controller } from "../../../db/models/Admin/Admin.controller.js";
export const admin_keyboard_composer = new Composer();

admin_keyboard_composer.command("start", async (ctx) => {
  try {
    const admin = await admin_controller.get_one_by({
      telegram_chat_id: ctx.from.id,
    });
    ctx.reply(
      `Вітаю! Ви маєте права адміністратора. Ваш telegram_id: ${admin.dataValues.telegram_chat_id}`,
      admin_keyboard
    );
  } catch (error) {
    console.error(error);
    ctx.reply("Наразі бот недоступний :(");
  }
});
admin_keyboard_composer.hears(ADMIN_KEYBOARD_ID.ADD_CLIENT, (ctx) => {
  ctx.scene.enter(ADMIN_KEYBOARD_ID.ADD_CLIENT);
});
admin_keyboard_composer.hears(ADMIN_KEYBOARD_ID.DELETE_CLIENT, (ctx) => {
  ctx.scene.enter(ADMIN_KEYBOARD_ID.DELETE_CLIENT);
});
admin_keyboard_composer.hears(ADMIN_KEYBOARD_ID.COMPLETE_TASK, (ctx) => {
  ctx.scene.enter(ADMIN_KEYBOARD_ID.COMPLETE_TASK);
});
admin_keyboard_composer.hears(
  ADMIN_KEYBOARD_ID.CLIENTS_LIST,
  show_clients_handler
);
admin_keyboard_composer.hears(
  ADMIN_KEYBOARD_ID.TASKS_LIST,
  admin_tasks_show_list_handler
);
