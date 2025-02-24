import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Team_pokemon extends Model {}

Team_pokemon.init(
  {
    pokemon_id: { type: DataTypes.INTEGER, allowNull: false },
    team_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "team_pokemon",

    timestamps: true,

    createdAt: true,

    updatedAt: true,
  }
);

export default Team_pokemon;
