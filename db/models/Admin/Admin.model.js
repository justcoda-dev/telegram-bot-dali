import { psql } from "./../../index.js";
import { DataTypes } from "@sequelize/core";

export const Admin = psql.define(
  "Admin",
  {
    telegram_chat_id: {
      type: DataTypes.BIGINT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {}
);
