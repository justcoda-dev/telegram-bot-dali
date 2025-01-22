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
      ctx.reply(
        "Завдання створене, зачекайте на підтвердження від адміністратора."
      );
    } else {
      ctx.reply("Завдання не створене, можливо вас видалили з бази клієнтів.");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("При створенні завдання сталася помилка", error);
  }
};
const client_cancel_create_task = async (ctx) => {
  ctx.deleteMessage();
};
export { client_submit_create_tusk, client_cancel_create_task };
