import Pokemon_type from "./pokemon_typeModel.js";
import Team_pokemon from "./team_pokemonModel.js";
import Type from "./typeModel.js";
import Team from "./teamModel.js";
import Pokemon from "./pokemonModel.js";
import sequelize from "../../data/client.js";

Pokemon.belongsToMany(Type, {
  through: Pokemon_type,
  foreignKey: "pokemon_id",
  otherKey: "type_id",
  as: "type",
});

Type.belongsToMany(Pokemon, {
  through: Pokemon_type,
  foreignKey: "type_id",
  otherKey: "pokemon_id",
  as: "pokemon",
});

Pokemon.belongsToMany(Team, {
  through: Team_pokemon,
  foreignKey: "pokemon_id",
  otherKey: "team_id",
  as: "team",
});

Team.belongsToMany(Pokemon, {
  through: Team_pokemon,
  foreignKey: "team_id",
  otherKey: "pokemon_id",
  as: "pokemon",
});

export { Pokemon, Pokemon_type, Type, Team, Team_pokemon, sequelize };
