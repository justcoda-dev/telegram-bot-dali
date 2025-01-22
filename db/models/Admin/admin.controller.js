import { Admin } from "./../relations.js";

export const admin_controller = () => {};

admin_controller.get_all = async () => {
  try {
    const admins = await Admin.findAll();
    return admins;
  } catch (error) {
    console.error(error);
    return error;
  }
};
admin_controller.post = async (admin) => {
  try {
    await Admin.sync();
    const admin = await Admin.create(admin);
    return admin;
  } catch (error) {
    console.error(error);
    return error;
  }
};
admin_controller.update = async (admin, searchParam) => {
  try {
    const admins = await Admin.update(admin, searchParam);
    return admins;
  } catch (error) {
    console.error(error);
    return error;
  }
};
admin_controller.delete_by = async (search_params) => {
  try {
    const admin = await Admin.destroy({ where: search_params });
    return admin;
  } catch (error) {
    console.error(error);
    return error;
  }
};
admin_controller.get_one_by = async (search_params) => {
  try {
    const user = await Admin.findOne({ where: search_params });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
};
