import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Type extends Model {}

Type.init(
  {
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    color: { type: DataTypes.STRING(7), allowNull: false },
  },
  {
    sequelize,
    tableName: "type",

    timestamps: true,

    createdAt: true,

    updatedAt: true,
  }
);

export default Type;
