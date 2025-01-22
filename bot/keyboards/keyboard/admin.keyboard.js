import { Markup } from "telegraf";
import { ADMIN_KEYBOARD_ID } from "./keyboard_id.js";
export const admin_keyboard = Markup.keyboard([
  [ADMIN_KEYBOARD_ID.ADD_CLIENT, ADMIN_KEYBOARD_ID.DELETE_CLIENT],
  [ADMIN_KEYBOARD_ID.TASKS_LIST, ADMIN_KEYBOARD_ID.CLIENTS_LIST],
  [ADMIN_KEYBOARD_ID.COMPLETE_TASK],
]).resize();
