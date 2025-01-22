import { client_controller } from "../../../db/models/Client/client.controller.js";

const admin_submit_delete_client_handler = async (ctx) => {
  try {
    const client_id = ctx.session.client_id;
    const client = await client_controller.get_one_by({
      telegram_chat_id: client_id,
    });
    const client_deleted = await client_controller.delete_by({
      telegram_chat_id: client_id,
    });

    if (client_deleted) {
      ctx.session = {};
      ctx.deleteMessage();
      ctx.replyWithHTML(
        `<b>Клієнта ${client.dataValues.name}, id: ${client_id} видалено/</b>`
      );
    } else {
      ctx.reply(
        `Клієнта з telegram_id: ${client_id}, не знайдено, перевірте данні. `
      );
    }
  } catch (error) {
    ctx.reply("При видаленні клієнта сталась помилка :(", error);
    console.error(error);
  }
};

const admin_cancel_delete_client_handler = (ctx) => {
  ctx.deleteMessage();
};
export {
  admin_submit_delete_client_handler,
  admin_cancel_delete_client_handler,
};
