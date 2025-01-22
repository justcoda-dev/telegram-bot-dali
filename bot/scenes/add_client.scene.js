import { WizardScene } from "telegraf/scenes";
import { submit_create_client_keyboard } from "./../keyboards/inline_keyboard/submit_create_client.keyboard.js";
import { ADMIN_KEYBOARD_ID } from "../keyboards/keyboard/keyboard_id.js";

export const add_client_scene = new WizardScene(
  ADMIN_KEYBOARD_ID.ADD_CLIENT,
  async (ctx) => {
    try {
      await ctx.reply("Введіть телеграм id вклієнта.");
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      await ctx.reply(
        "Нажаль при створенні сталася помилка, спробуйте пізніше :("
      );
    }
  },
  async (ctx) => {
    try {
      const client_id = ctx.message.text;
      const idIsNumber = client_id
        .split("")
        .every((char) => char >= "0" && char <= "9");
      if (idIsNumber) {
        ctx.session.client_id = client_id;
        await ctx.reply("Введіть ім'я клієнта.");
        return ctx.wizard.next();
      } else {
        await ctx.reply(
          "Телеграм id вказано невірно! Воно складаєть тільки з цифр. Перевірте та вкажіть ще раз."
        );
        return ctx.scene.reenter();
      }
    } catch (error) {
      console.error(error);

      await ctx.reply(
        "Нажаль при створенні сталася помилка, спробуйте пізніше :("
      );
    }
  },
  async (ctx) => {
    try {
      const client_name = ctx.message.text;
      if (client_name) {
        ctx.session.client_name = client_name;
        await ctx.reply(
          `Підтвердіть створення клієнта: Телеграм id клієнта: ${ctx.session.client_id}, Ім'я клієнта: ${client_name}`,
          submit_create_client_keyboard
        );
        return ctx.scene.leave();
      } else {
        await ctx.reply("Ім'я не може бути пустим. Введіть ім'я клієнта.");
        return ctx.wizard.back();
      }
    } catch (error) {
      console.error(error);
      await ctx.reply(
        "Нажаль при створенні сталася помилка, спробуйте пізніше :("
      );
    }
  }
);
