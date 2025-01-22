import { admin_composer } from "../composers/admin/admin.composer.js";
import { client_composer } from "../composers/client/client.composer.js";
import { admin_controller } from "../../db/models/Admin/Admin.controller.js";
import { client_controller } from "../../db/models/Client/client.controller.js";
export const authorization = async (ctx, next) => {
  const user_id = ctx.from.id;
  const user_is_admin = await admin_controller.get_one_by({
    telegram_chat_id: user_id,
  });

  const user_is_client = await client_controller.get_one_by({
    telegram_chat_id: user_id,
  });

  if (user_is_client) {
    return client_composer.middleware()(ctx, next);
  } else if (user_is_admin) {
    return admin_composer.middleware()(ctx, next);
  } else {
    ctx.reply("У вас немає доступу до користування цим ботом");
  }
};
