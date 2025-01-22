import { client_controller } from "../../../db/models/Client/client.controller.js";
import { task_controller } from "../../../db/models/Task/task.controller.js";

export const admin_submit_task_handler = async (ctx) => {
  try {
    const message = ctx.update.callback_query.message.text;
    const splitted_message = message.split(" ");
    const task_id = splitted_message[3];
    const client_id = splitted_message[1];
    const client = await client_controller.get_one_by({
      telegram_chat_id: client_id,
    });
    const task_is_updated = await task_controller.update(
      { is_active: true },
      { id: task_id }
    );
    const task = await task_controller.get_one_by({ id: task_id });
    if (task_is_updated) {
      ctx.session = {};
      ctx.deleteMessage();
      ctx.reply(
        `Завдання id:${task.dataValues.id}, від ${client.dataValues.name} пвдтверджено`
      );
    } else {
      ctx.reply(`Завдання з id:${task_id} не знайдено`);
    }
  } catch (error) {
    console.error(error);
    ctx.reply(`При відтвердженні завдання сталась помилка:(`);
  }
};
