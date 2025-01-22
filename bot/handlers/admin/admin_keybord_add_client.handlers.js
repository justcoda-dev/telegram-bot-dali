import { admin_controller } from "../../../db/models/Admin/Admin.controller.js";
import { client_controller } from "../../../db/models/Client/client.controller.js";

const submit_add_client_handler = async (ctx) => {
  try {
    const admin = await admin_controller.get_one_by({
      telegram_chat_id: ctx.from.id,
    });

    const client = await client_controller.post({
      telegram_chat_id: ctx.session.client_id,
      name: ctx.session.client_name,
      admin_id: admin.dataValues.id,
    });
    if (client) {
      ctx.session = {};
      ctx.deleteMessage();
      ctx.reply(`Клієнта ${client.dataValues.name} успішно створено`);
    } else {
      ctx.reply(`Невірно вказанні данні`);
    }
  } catch (error) {
    console.error(error);
    ctx.reply("При створенні виникла помилка", error);
  }
};

const cancel_add_client_handler = (ctx) => {
  ctx.deleteMessage();
};

export { submit_add_client_handler, cancel_add_client_handler };
