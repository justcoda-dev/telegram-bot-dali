import { Composer } from "telegraf";
import { INLINE_KEYBOARD_ID_CLIENT } from "../../keyboards/inline_keyboard/inline_keyboard_id.js";
import {
  client_cancel_create_task,
  client_submit_create_tusk,
} from "../../handlers/client/client_keybord_add_task.handlers.js";

export const client_inline_composer = new Composer();
client_inline_composer.action(
  INLINE_KEYBOARD_ID_CLIENT.SUBMIT_CREATE_TASK,
  client_submit_create_tusk
);
client_inline_composer.action(
  INLINE_KEYBOARD_ID_CLIENT.CANCEL_CREATE_TASK,
  client_cancel_create_task
);
