import { WizardScene } from "telegraf/scenes";
import { ADMIN_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";
import { submit_close_task_keyboard } from "../keyboards/inline_keyboard/submit_close_task.keyboard.js";

export const admin_complete_task = new WizardScene(
  ADMIN_KEYBOARD_ID.COMPLETE_TASK,
  async (ctx) => {
    try {
      await ctx.reply("Введіть id завдання яке ви бажаєте зевершити.");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      await ctx.reply("Нажаль при завершенні завдання сталася помилка :(");
    }
  },
  async (ctx) => {
    try {
      const task_id = ctx.message.text;
      ctx.session.task_id = task_id;
      const id_is_number = parseInt(task_id).toString() === task_id;
      if (id_is_number) {
        await ctx.reply(`Введіть текст для клієнта.`);
        return ctx.wizard.next();
      } else {
        await ctx.reply(`Невірно вказано id завдання.`);
        return ctx.scene.reenter();
      }
    } catch (error) {
      console.error(error);
      await ctx.reply("Нажаль при завершенні завдання сталася помилка :(");
    }
  },
  async (ctx) => {
    try {
      const message_to_client = ctx.message.text;
      ctx.session.message_to_client = message_to_client;
      await ctx.reply(
        `Завершити завдання id: ${ctx.session.task_id} ?`,
        submit_close_task_keyboard
      );
      return ctx.scene.leave();
    } catch (error) {
      console.error(error);
      await ctx.reply("Нажаль при завершенні завдання сталася помилка :(");
    }
  }
);
