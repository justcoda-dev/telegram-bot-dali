import { psql } from "../../index.js";
import { DataTypes } from "@sequelize/core";

export const Client = psql.define(
  "Client",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
