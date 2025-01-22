import { Admin } from "./Admin/Admin.model.js";
import { Task } from "./Task/Task.model.js";
import { Client } from "./Client/Client.model.js";

Admin.hasMany(Client, {
  foreignKey: "admin_id",
});
Admin.hasMany(Task, {
  foreignKey: "admin_id",
});
Client.hasMany(Task, {
  foreignKey: "client_id",
});

await Admin.sync();
await Client.sync();
await Task.sync();

export { Admin, Task, Client };
