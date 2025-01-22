import { INLINE_KEYBOARD_ID_ADMIN } from "./inline_keyboard_id.js";
import { Markup } from "telegraf";

export const submit_close_task_keyboard = Markup.inlineKeyboard([
  Markup.button.callback(
    "Підтвердити",
    INLINE_KEYBOARD_ID_ADMIN.SUBMIT_COMPLETE_TASK
  ),
  Markup.button.callback(
    "Скасувати",
    INLINE_KEYBOARD_ID_ADMIN.CANCEL_COMPLETE_TASK
  ),
]);
