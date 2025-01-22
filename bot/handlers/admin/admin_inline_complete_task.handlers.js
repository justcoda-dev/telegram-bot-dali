import { task_controller } from "../../../db/models/Task/task.controller.js";

const admin_submit_complete_task_handler = async (ctx) => {
  try {
    const message_to_client = ctx.session.message_to_client;
    const task_id = ctx.session.task_id;
    const task_is_updated = await task_controller.update(
      { is_completed: true, task_response: message_to_client },
      { id: task_id }
    );
    if (task_is_updated) {
      ctx.deleteMessage();
      ctx.reply(`Завдання ${task_id} завершене. Відповідь надіслана клієнту.`);
    }
  } catch (error) {
    console.error(error);
    ctx.reply("При підтвердженні завдання сталась помилка :(");
  }
};

const admin_cancel_complete_task_handler = (ctx) => {
  ctx.deleteMessage();
};
export {
  admin_submit_complete_task_handler,
  admin_cancel_complete_task_handler,
};
