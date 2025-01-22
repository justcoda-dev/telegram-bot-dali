import { Markup } from "telegraf";
import { INLINE_KEYBOARD_ID_ADMIN } from "./inline_keyboard_id.js";

export const submit_delete_client = Markup.inlineKeyboard([
  Markup.button.callback(
    "Підтвердити",
    INLINE_KEYBOARD_ID_ADMIN.SUBMIT_DELETE_CLIENT
  ),
  Markup.button.callback(
    "Скасувати",
    INLINE_KEYBOARD_ID_ADMIN.CANCEL_DELETE_CLIENT
  ),
]);
