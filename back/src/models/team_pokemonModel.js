import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Team_pokemon extends Model {}

Team_pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      unique: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      unique: false,
    },
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
