import { Markup } from "telegraf";
import { INLINE_KEYBOARD_ID_CLIENT } from "./inline_keyboard_id.js";

export const submit_create_task_keyboard = Markup.inlineKeyboard([
  Markup.button.callback(
    "Підтвердити",
    INLINE_KEYBOARD_ID_CLIENT.SUBMIT_CREATE_TASK
  ),
  Markup.button.callback(
    "Скасувати",
    INLINE_KEYBOARD_ID_CLIENT.CANCEL_CREATE_TASK
  ),
]);
