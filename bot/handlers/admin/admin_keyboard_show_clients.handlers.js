import { client_controller } from "../../../db/models/Client/client.controller.js";
import { navigation_clients_keyboard } from "../../keyboards/inline_keyboard/navigation_clients.keyboard.js";
import { loading } from "../../utils/loading.js";
const items_per_page = 5;
const show_clients_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);
    await start_loading_message();
    ctx.session.clients_page = 1;
    const offset = (ctx.session.clients_page - 1) * items_per_page;
    const clients = await client_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.clients_max_page = Math.ceil(clients.count / items_per_page);
    if (clients.rows.length) {
      const clientsList = clients.rows
        .map(
          (client, index) =>
            `${index + 1 + offset}. id: <b>${
              client.dataValues.telegram_chat_id
            }.</b> Ім'я: <b>${client.dataValues.name}.</b>`
        )
        .join("\n");

      ctx.deleteMessage();
      ctx.replyWithHTML(
        `Список клієнтів:\n ${clientsList}\n Сторінка ${ctx.session.clients_page} із ${ctx.session.clients_max_page}`,
        navigation_clients_keyboard
      );
    } else {
      ctx.reply("Список клієнтів пустий.");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("Помилка при отриманні клієнтів");
  }
};
const next_page_clients_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);

    ctx.session.clients_page =
      ctx.session.clients_page < ctx.session.clients_max_page
        ? ctx.session.clients_page + 1
        : ctx.session.clients_max_page;

    const offset = (ctx.session.clients_page - 1) * items_per_page;
    await start_loading_message();
    const clients = await client_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.clients_max_page = Math.ceil(clients.count / items_per_page);
    if (clients.rows.length) {
      const clientsList = clients.rows
        .map(
          (client, index) =>
            `${index + 1 + offset}.  id: <b>${
              client.dataValues.telegram_chat_id
            }</b> Імя: <b>${client.dataValues.name}</b>.`
        )
        .join("\n");
      ctx.deleteMessage();
      ctx.replyWithHTML(
        `Список клієнтів:\n ${clientsList}\n Сторінка ${ctx.session.clients_page} із ${ctx.session.clients_max_page}`,
        navigation_clients_keyboard
      );
    } else {
      ctx.reply("Список клієнтів пустий.");
    }
  } catch (error) {
    console.error(error);
  }
};
const prev_page_clients_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);

    ctx.session.clients_page =
      ctx.session.clients_page > 1 ? ctx.session.clients_page - 1 : 1;
    const offset = (ctx.session.clients_page - 1) * items_per_page;
    await start_loading_message();
    const clients = await client_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.clients_max_page = Math.ceil(clients.count / items_per_page);
    if (clients.rows.length) {
      const clientsList = clients.rows
        .map(
          (client, index) =>
            `${index + 1 + offset}. id: <b>${
              client.dataValues.telegram_chat_id
            }</b> Імя: <b>${client.dataValues.name}</b>.`
        )
        .join("\n");
      ctx.deleteMessage();
      ctx.replyWithHTML(
        `Список клієнтів:\n ${clientsList}\n Сторінка ${ctx.session.clients_page} із ${ctx.session.clients_max_page}`,
        navigation_clients_keyboard
      );
    } else {
      ctx.reply("Список клієнтів пустий.");
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  show_clients_handler,
  next_page_clients_handler,
  prev_page_clients_handler,
};
