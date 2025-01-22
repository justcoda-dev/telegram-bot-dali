import { WizardScene } from "telegraf/scenes";
import { CLIENT_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";
import { submit_create_task_keyboard } from "../keyboards/inline_keyboard/submit_create_task.keyboard.js";

export const client_create_task = new WizardScene(
  CLIENT_KEYBOARD_ID.CREATE_TASK,
  async (ctx) => {
    try {
      await ctx.reply("Будь ласка опишіть вашу задачу");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async (ctx) => {
    try {
      const task = ctx.message.text;
      ctx.session.task = task;
      await ctx.reply(
        `Відправити задачу :${task} ?`,
        submit_create_task_keyboard
      );
      return ctx.scene.leave();
    } catch (error) {}
  }
);
