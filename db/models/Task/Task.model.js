import { DataTypes } from "@sequelize/core";
import { psql } from "../../index.js";
import { bot } from "../../../bot/bot.js";
import { client_controller } from "../Client/client.controller.js";
import { admin_controller } from "../Admin/Admin.controller.js";
import { submit_task_keyboard } from "../../../bot/keyboards/inline_keyboard/submit_task.keyboard.js";
export const Task = psql.define(
  "Task",
  {
    task_text: {
      type: DataTypes.TEXT,
      allowNull: null,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    task_response: {
      type: DataTypes.TEXT,
      allowNull: null,
    },
  },
  {
    hooks: {
      afterCreate: async (task) => {
        try {
          const client = await client_controller.get_one_by({
            id: task.dataValues.client_id,
          });
          const admin = await admin_controller.get_one_by({
            id: task.dataValues.admin_id,
          });

          const message = `Telegram_ID: ${client.dataValues.telegram_chat_id} Task_ID: ${task.dataValues.id} Нова задача від: ${client.dataValues.name}.\n ${task.dataValues.task_text} `;
          await bot.telegram.sendMessage(
            admin.dataValues.telegram_chat_id,
            message,
            submit_task_keyboard
          );
        } catch (error) {
          console.error("error in hook", error);
        }
      },
      afterUpdate: async (task) => {
        try {
          const client = await client_controller.get_one_by({
            id: task.dataValues.client_id,
          });
          if (task.dataValues.is_active && client) {
            const message = `Task_ID: ${task.dataValues.id}. Вашу задачу прийнято і взято в роботу.`;
            await bot.telegram.sendMessage(
              client.dataValues.telegram_chat_id,
              message
            );
          }
          if (
            task.dataValues.is_active &&
            client &&
            task.dataValues.is_completed
          ) {
            const message = `Task_ID: ${task.dataValues.id}. Менеджер перевів вашу заявку у статус виконано. Коментар адміна: ${task.dataValues.task_response}`;
            await bot.telegram.sendMessage(
              client.dataValues.telegram_chat_id,
              message
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  }
);
