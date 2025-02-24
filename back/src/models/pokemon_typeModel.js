import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Pokemon_type extends Model {}

Pokemon_type.init(
  {
    pokemon_id: { type: DataTypes.INTEGER, allowNull: false },
    type_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "pokemon_type",

    timestamps: true,

    createdAt: true,

    updatedAt: true,
  }
);

export default Pokemon_type;
