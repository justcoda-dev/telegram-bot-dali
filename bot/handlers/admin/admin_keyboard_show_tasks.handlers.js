import { navigation_list_keyboard } from "../../keyboards/inline_keyboard/navigation_list.keyboard.js";
import { client_controller } from "../../../db/models/Client/client.controller.js";
import { task_controller } from "../../../db/models/Task/task.controller.js";

const admin_tasks_show_list_handler = async (ctx) => {
  try {
    const items_per_page = 5;
    const offset = 0;
    ctx.session.tasks_page = 1;
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );
    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);

    if (tasks.rows.length) {
      const tasksList = await tasks.rows.map(async (task, index) => {
        const client = await client_controller.get_one_by({
          id: task.dataValues.client_id,
        });
        return `${index + 1 + offset}. <b>${
          task.dataValues.task_text
        }</b> Клієнт: <b>${client?.dataValues?.name}</b><b>ID:${
          task.dataValues.id
        }</b>. <b>В роботі ${task.dataValues.is_active}</b>. <b>Завершена ${
          task.dataValues.is_completed
        }</b>`;
      });
      ctx.replyWithHTML(
        `Ось ваш список задач:\n${(await Promise.all(tasksList)).join(
          "\n"
        )}\n Сторінка ${ctx.session.tasks_page} із ${
          ctx.session.tasks_page_maximum
        }`,
        navigation_list_keyboard
      );
    } else {
      ctx.reply("Список задач пустий.");
    }
  } catch (error) {
    console.error(error);
  }
};

const admin_tasks_next_handler = async (ctx) => {
  try {
    const items_per_page = 5;
    ctx.session.tasks_page =
      ctx.session.tasks_page < ctx.session.tasks_page_maximum
        ? ctx.session.tasks_page + 1
        : ctx.session.tasks_page;
    const offset = (ctx.session.tasks_page - 1) * items_per_page;
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );

    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);
    const tasks_list = await tasks.rows.map(async (task, index) => {
      const client = await client_controller.get_one_by({
        id: task.dataValues.client_id,
      });
      return `${index + 1 + offset}. <b>${
        task.dataValues.task_text
      }</b> Клієнт: <b>${client?.dataValues?.name}</b><b>ID:${
        task.dataValues.id
      }</b>. <b>В роботі ${task.dataValues.is_active}</b>. <b>Завершена ${
        task.dataValues.is_completed
      }</b>`;
    });
    ctx.deleteMessage();
    ctx.replyWithHTML(
      `Ось ваш список задач:\n ${(await Promise.all(tasks_list)).join(
        "\n"
      )}\n Сторінка ${ctx.session.tasks_page} із ${
        ctx.session.tasks_page_maximum
      }`,
      navigation_list_keyboard
    );
  } catch (error) {}
};

const admin_tasks_prev_handler = async (ctx) => {
  try {
    const items_per_page = 5;
    ctx.session.tasks_page =
      ctx.session.tasks_page > 1 ? ctx.session.tasks_page - 1 : 1;
    const offset = (ctx.session.tasks_page - 1) * items_per_page;
    const tasks = await task_controller.get_all_and_count(
      offset,
      items_per_page
    );

    ctx.session.tasks_page_maximum = Math.ceil(tasks.count / items_per_page);
    const tasks_list = await tasks.rows.map(async (task, index) => {
      const client = await client_controller.get_one_by({
        id: task.dataValues.client_id,
      });

      return `${index + 1 + offset}. <b>${
        task.dataValues.task_text
      }</b> Клієнт: <b>${client?.dataValues?.name}</b><b>ID:${
        task.dataValues.id
      }</b>. <b>В роботі ${task.dataValues.is_active}</b>. <b>Завершена ${
        task.dataValues.is_completed
      }</b>`;
    });
    ctx.deleteMessage();
    ctx.replyWithHTML(
      `Ось ваш список задач:\n ${(await Promise.all(tasks_list)).join(
        "\n"
      )}\n Сторінка ${ctx.session.tasks_page} із ${
        ctx.session.tasks_page_maximum
      }`,
      navigation_list_keyboard
    );
  } catch (error) {}
};
export {
  admin_tasks_next_handler,
  admin_tasks_prev_handler,
  admin_tasks_show_list_handler,
};
