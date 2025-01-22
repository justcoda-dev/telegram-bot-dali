import { Markup } from "telegraf";
import { INLINE_KEYBOARD_ID_ADMIN } from "./inline_keyboard_id.js";

export const submit_task_keyboard = Markup.inlineKeyboard([
  Markup.button.callback("Підтвердити", INLINE_KEYBOARD_ID_ADMIN.SUBMIT_TASK),
]);
