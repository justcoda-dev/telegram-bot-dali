import { Composer } from "telegraf";
import { INLINE_KEYBOARD_ID_ADMIN } from "../../keyboards/inline_keyboard/inline_keyboard_id.js";
import { admin_submit_task_handler } from "../../handlers/admin/admin_inline_submit_task.handler.js";

import {
  next_page_clients_handler,
  prev_page_clients_handler,
} from "../../handlers/admin/admin_keyboard_show_clients.handlers.js";
import {
  admin_tasks_next_handler,
  admin_tasks_prev_handler,
} from "../../handlers/admin/admin_keyboard_show_tasks.handlers.js";
import {
  cancel_add_client_handler,
  submit_add_client_handler,
} from "../../handlers/admin/admin_keybord_add_client.handlers.js";
import {
  admin_cancel_delete_client_handler,
  admin_submit_delete_client_handler,
} from "../../handlers/admin/admin_keyboard_delete_client.handlers.js";
import {
  admin_cancel_complete_task_handler,
  admin_submit_complete_task_handler,
} from "../../handlers/admin/admin_inline_complete_task.handlers.js";
export const admin_inline_composer = new Composer();

admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.SUBMIT_CREATE_CLIENT,
  submit_add_client_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.CANCEL_CREATE_CLIENT,
  cancel_add_client_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.CANCEL_DELETE_CLIENT,
  admin_cancel_delete_client_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.SUBMIT_DELETE_CLIENT,
  admin_submit_delete_client_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.SUBMIT_TASK,
  admin_submit_task_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.SUBMIT_COMPLETE_TASK,
  admin_submit_complete_task_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.CANCEL_COMPLETE_TASK,
  admin_cancel_complete_task_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.PREVIOUS,
  admin_tasks_prev_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.NEXT,
  admin_tasks_next_handler
);

admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.CLIENTS_NEXT,
  next_page_clients_handler
);
admin_inline_composer.action(
  INLINE_KEYBOARD_ID_ADMIN.CLIENTS_PREVIOUS,
  prev_page_clients_handler
);
