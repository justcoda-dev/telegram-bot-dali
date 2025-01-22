import { task_controller } from "../../../db/models/Task/task.controller.js";

const admin_submit_complete_task_handler = async (ctx) => {
  try {
    console.log("CLICK");
    const message_to_client = ctx.session.message_to_client;
    const task_id = ctx.session.task_id;
    console.log(message_to_client, task_id);
    const task_is_updated = await task_controller.update(
      { is_completed: true, task_response: message_to_client },
      { id: task_id }
    );
    console.log("TASK UPDATED", task_is_updated);
    if (task_is_updated) {
      ctx.deleteMessage();
      ctx.reply(`Задача ${task_id} завершена.Відповідь надіслана клієнту.`);
    }
  } catch (error) {
    console.error(error);
  }
};

const admin_cancel_complete_task_handler = (ctx) => {
  ctx.deleteMessage();
};
export {
  admin_submit_complete_task_handler,
  admin_cancel_complete_task_handler,
};
