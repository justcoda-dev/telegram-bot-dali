import { Markup } from "telegraf";
import { CLIENT_KEYBOARD_ID } from "./keyboard_id.js";
export const client_keyboard = Markup.keyboard([
  [CLIENT_KEYBOARD_ID.CREATE_TASK],
]).resize();
