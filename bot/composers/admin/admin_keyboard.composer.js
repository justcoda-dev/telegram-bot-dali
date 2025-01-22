import { Composer } from "telegraf";
import { ADMIN_KEYBOARD_ID } from "../../keyboards/keyboard/keyboard_id.js";
import { show_clients_handler } from "../../handlers/admin/admin_keyboard_show_clients.handlers.js";
import { admin_keyboard } from "../../keyboards/keyboard/admin.keyboard.js";
import { admin_tasks_show_list_handler } from "../../handlers/admin/admin_keyboard_show_tasks.handlers.js";
export const admin_keyboard_composer = new Composer();

admin_keyboard_composer.command("start", (ctx) => {
  ctx.reply("Ви зайшли як ADMIN_ID адміністратор", admin_keyboard);
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
