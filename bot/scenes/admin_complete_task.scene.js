import { WizardScene } from "telegraf/scenes";
import { ADMIN_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";
import { submit_close_task_keyboard } from "../keyboards/inline_keyboard/submit_close_task.keyboard.js";

export const admin_complete_task = new WizardScene(
  ADMIN_KEYBOARD_ID.COMPLETE_TASK,
  async (ctx) => {
    try {
      await ctx.reply("Введіть ID задачі яку ви бажаєте зевершити");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);

      ctx.reply("Невірно вказаний ІД");
    }
  },
  async (ctx) => {
    try {
      const task_id = ctx.message.text;
      ctx.session.task_id = task_id;
      await ctx.reply(`Введіть текст для клієнта`);
      ctx.wizard.next();
    } catch (error) {
      console.error(error);
      ctx.reply("Невірно вказаний текст");
    }
  },
  async (ctx) => {
    try {
      const message_to_client = ctx.message.text;
      ctx.session.message_to_client = message_to_client;
      await ctx.reply(
        `Завершити задачу ID:${ctx.session.task_id} ?`,
        submit_close_task_keyboard
      );
      return ctx.scene.leave();
    } catch (error) {
      console.error(error);
    }
  }
);
