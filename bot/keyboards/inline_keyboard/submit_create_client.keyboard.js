import { Markup } from "telegraf";
import { INLINE_KEYBOARD_ID_ADMIN } from "./inline_keyboard_id.js";

export const submit_create_client_keyboard = Markup.inlineKeyboard([
  Markup.button.callback(
    "Підтвердити",
    INLINE_KEYBOARD_ID_ADMIN.SUBMIT_CREATE_CLIENT
  ),
  Markup.button.callback(
    "Скасувати",
    INLINE_KEYBOARD_ID_ADMIN.CANCEL_CREATE_CLIENT
  ),
]);
