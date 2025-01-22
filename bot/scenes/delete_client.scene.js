import { WizardScene } from "telegraf/scenes";
import { submit_delete_client } from "./../keyboards/inline_keyboard/submit_delete_client.keyboard.js";
import { ADMIN_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";

export const delete_client_scene = new WizardScene(
  ADMIN_KEYBOARD_ID.DELETE_CLIENT,
  async (ctx) => {
    try {
      await ctx.reply("Введіть Телеграм id клієнта для видалення.");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      ctx.reply("При видаленні клієнта сталася помилка :(");
    }
  },

  async (ctx) => {
    try {
      ctx.session.client_id = ctx.message.text;
      const id_is_number =
        parseInt(ctx.message.text).toString() === ctx.message.text;
      if (id_is_number) {
        await ctx.reply(
          `Підтвердіть видалення клієнта: Телеграм ІD клієнта: ${ctx.session.client_id}`,
          submit_delete_client
        );
      } else {
        ctx.reply(
          "Невірно вказане id клієнта, воно складається тільки з цифр."
        );
      }
      return ctx.scene.leave();
    } catch (error) {
      console.error(error);

      ctx.reply("При видаленні клієнта сталася помилка :(");
    }
  }
);
