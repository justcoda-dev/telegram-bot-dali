import { navigation_list_keyboard } from "../../keyboards/inline_keyboard/navigation_list.keyboard.js";
import { client_controller } from "../../../db/models/Client/client.controller.js";
import { task_controller } from "../../../db/models/Task/task.controller.js";
import { loading } from "../../utils/loading.js";
const items_per_page = 5;
const admin_tasks_show_list_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);
    const offset = 0;
    ctx.session.tasks_page = 1;
    await start_loading_message();
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);

    if (tasks.rows.length) {
      const tasksList = await tasks.rows.map(async (task, index) => {
        const client = await client_controller.get_one_by({
          id: task.dataValues.client_id,
        });
        return `${index + 1 + offset}. Клієнт: <b>${
          client?.dataValues?.name
        }.</b> <b>id: ${task.dataValues.id}</b>. <b> ${
          task.dataValues.is_active ? "Підтверджено" : "Не підтверджено."
        }.</b> <b>${
          task.dataValues.is_completed ? "Завершено" : "В роботі"
        }.</b>\nТекст завдання: <b>${task.dataValues.task_text}</b>\n`;
      });
      ctx.replyWithHTML(
        `Cписок завдань:\n${(await Promise.all(tasksList)).join(
          "\n"
        )}\n Сторінка ${ctx.session.tasks_page} із ${
          ctx.session.tasks_page_maximum
        }`,
        navigation_list_keyboard
      );
    } else {
      ctx.reply("Список завдань пустий.");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("Підчас пошуку завдань, сталась помилка :(");
  }
};

const admin_tasks_next_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);
    ctx.session.tasks_page =
      ctx.session.tasks_page < ctx.session.tasks_page_maximum
        ? ctx.session.tasks_page + 1
        : ctx.session.tasks_page;
    const offset = (ctx.session.tasks_page - 1) * items_per_page;
    await start_loading_message();
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);
    const tasks_list = await tasks.rows.map(async (task, index) => {
      const client = await client_controller.get_one_by({
        id: task.dataValues.client_id,
      });
      return `${index + 1 + offset}. Клієнт: <b>${
        client?.dataValues?.name
      }.</b> <b>id: ${task.dataValues.id}</b>. <b> ${
        task.dataValues.is_active ? "Підтверджено" : "Не підтверджено."
      }.</b> <b>${
        task.dataValues.is_completed ? "Завершено" : "В роботі"
      }.</b>\nТекст завдання: <b>${task.dataValues.task_text}</b>\n`;
    });
    if (tasks_list.length) {
      ctx.deleteMessage();
      ctx.replyWithHTML(
        `Cписок завдань:\n${(await Promise.all(tasks_list)).join(
          "\n"
        )}\n Сторінка ${ctx.session.tasks_page} із ${
          ctx.session.tasks_page_maximum
        }`,
        navigation_list_keyboard
      );
    } else {
      ctx.reply("Список завдань пустий.");
    }
  } catch (error) {
    ctx.reply("Підчас пошуку завдань, сталась помилка :(");
  }
};

const admin_tasks_prev_handler = async (ctx) => {
  try {
    const { start_loading_message, end_loading_message } = loading(ctx);
    ctx.session.tasks_page =
      ctx.session.tasks_page > 1 ? ctx.session.tasks_page - 1 : 1;
    const offset = (ctx.session.tasks_page - 1) * items_per_page;
    await start_loading_message();
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );
    await end_loading_message();
    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);
    const tasks_list = await tasks.rows.map(async (task, index) => {
      const client = await client_controller.get_one_by({
        id: task.dataValues.client_id,
      });

      return `${index + 1 + offset}. Клієнт: <b>${
        client?.dataValues?.name
      }.</b> <b>id: ${task.dataValues.id}</b>. <b> ${
        task.dataValues.is_active ? "Підтверджено" : "Не підтверджено."
      }.</b> <b>${
        task.dataValues.is_completed ? "Завершено" : "В роботі"
      }.</b>\nТекст завдання: <b>${task.dataValues.task_text}</b>\n`;
    });
    if (tasks_list.length) {
      ctx.deleteMessage();
      ctx.replyWithHTML(
        `Cписок завдань:\n${(await Promise.all(tasks_list)).join(
          "\n"
        )}\n Сторінка ${ctx.session.tasks_page} із ${
          ctx.session.tasks_page_maximum
        }`,
        navigation_list_keyboard
      );
    } else {
      ctx.reply("Список завдань пустий.");
    }
  } catch (error) {
    ctx.reply("Підчас пошуку завдань, сталась помилка :(");
  }
};
export {
  admin_tasks_next_handler,
  admin_tasks_prev_handler,
  admin_tasks_show_list_handler,
};
