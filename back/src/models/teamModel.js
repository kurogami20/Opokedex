import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Team extends Model {}

Team.init(
  {
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "team",

    timestamps: true,

    createdAt: true,

    updatedAt: true,
  }
);

export default Team;
