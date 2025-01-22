import { task_controller } from "../../../db/models/Task/task.controller.js";
import { client_controller } from "../../../db/models/Client/client.controller.js";

const client_submit_create_tusk = async (ctx) => {
  try {
    const client_from_db = await client_controller.get_one_by({
      telegram_chat_id: ctx.from.id,
    });

    const task = await task_controller.post({
      client_id: client_from_db.dataValues.id,
      task_text: ctx.session.task,
      admin_id: client_from_db.dataValues.admin_id,
    });
    if (task) {
      ctx.reply("Задача створена, чекайте на підтвердження.");
    } else {
      ctx.reply("Нажаль не вийшлов створити задачу");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("При створенні задачі сталась помилка", error);
  }
};
const client_cancel_create_task = async (ctx) => {
  ctx.deleteMessage();
};
export { client_submit_create_tusk, client_cancel_create_task };
