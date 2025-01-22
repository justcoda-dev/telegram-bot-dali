import { WizardScene } from "telegraf/scenes";
import { submit_delete_client } from "./../keyboards/inline_keyboard/submit_delete_client.keyboard.js";
import { ADMIN_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";

export const delete_client_scene = new WizardScene(
  ADMIN_KEYBOARD_ID.DELETE_CLIENT,
  async (ctx) => {
    try {
      await ctx.reply("Введіть Telegram ID клієнта для видалення");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      ctx.reply(error);
    }
  },

  async (ctx) => {
    try {
      ctx.session.client_id = ctx.message.text;
      await ctx.reply(
        `Підтвердіть видалення клієнта: Телеграм ІD клієнта: ${ctx.session.client_id}`,
        submit_delete_client
      );
      return ctx.scene.leave();
    } catch (error) {
      console.error(error);
      ctx.reply(error);
    }
  }
);
