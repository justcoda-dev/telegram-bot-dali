import { Stage } from "telegraf/scenes";
import { bot } from "./bot.js";
import { add_client_scene } from "./scenes/add_client.scene.js";
import { session } from "telegraf";
import { client_create_task } from "./scenes/client_create_task.scene.js";
import { delete_client_scene } from "./scenes/delete_client.scene.js";
import { authorization } from "./middlewares/authorization.middleware.js";
import { admin_complete_task } from "./scenes/admin_complete_task.scene.js";

const stage = new Stage([
  add_client_scene,
  delete_client_scene,
  client_create_task,
  admin_complete_task,
]);

bot.use(session());
bot.use(stage.middleware());
bot.use(authorization);

export default bot;
