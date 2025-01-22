import { Task } from "./../relations.js";

export const task_controller = () => {};
task_controller.get_all = async (page, limit) => {
  try {
    const tasks = await Task.findAll({ limit, offset: page });
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.get_all_and_count = async (offset, limit) => {
  try {
    const tasks = await Task.findAndCountAll({ limit, offset });
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.post = async ({ task_text, client_id, admin_id }) => {
  try {
    await Task.sync();
    const tasks = await Task.create({ task_text, client_id, admin_id });
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.submit = async (task) => {
  try {
    const tasks = await Task.update(searchParam);
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.cancel = async () => {
  try {
    const tasks = await Task.update(searchParam);
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};

task_controller.update = async (value, searchParam) => {
  try {
    const task = await Task.update(value, {
      where: searchParam,
      individualHooks: true,
    });
    return task;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.delete_by = async (searchParam) => {
  try {
    const tasks = await Task.destroy({ where: searchParam });
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
task_controller.get_one_by = async (searchParam) => {
  try {
    const tasks = await Task.findOne({ where: searchParam });
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};
