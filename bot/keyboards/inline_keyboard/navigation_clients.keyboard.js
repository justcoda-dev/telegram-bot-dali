import { INLINE_KEYBOARD_ID_ADMIN } from "./inline_keyboard_id.js";
import { Markup } from "telegraf";

export const navigation_clients_keyboard = Markup.inlineKeyboard([
  Markup.button.callback(
    "Попередні",
    INLINE_KEYBOARD_ID_ADMIN.CLIENTS_PREVIOUS
  ),
  Markup.button.callback("Наступні", INLINE_KEYBOARD_ID_ADMIN.CLIENTS_NEXT),
]);
