import { Client } from "./../relations.js";

export const client_controller = () => {};
client_controller.get_all = async () => {
  try {
    const clients = await Client.findAll();
    return clients;
  } catch (error) {
    console.error(error);
    return error;
  }
};
client_controller.post = async (client) => {
  try {
    await Client.sync();
    const clients = await Client.create(client);
    return clients;
  } catch (error) {
    console.error(error);
    return error;
  }
};
client_controller.update = async (user, searchParam) => {
  try {
    const clients = await Client.update(user, searchParam);
    return clients;
  } catch (error) {
    console.error(error);
    return error;
  }
};
client_controller.delete_by = async (searchParam) => {
  try {
    const client = await Client.destroy({ where: searchParam });
    return client;
  } catch (error) {
    console.error(error);
    return false;
  }
};
client_controller.get_all_and_count = async (offset, limit) => {
  try {
    const clients = await Client.findAndCountAll({ limit, offset });
    return clients;
  } catch (error) {
    console.error(error);
    return error;
  }
};
client_controller.get_one_by = async (searchParam) => {
  try {
    const client = await Client.findOne({ where: searchParam });
    return client;
  } catch (error) {
    console.error(error);
    return error;
  }
};
