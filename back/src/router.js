import express from "express";
import pokemon from "./controllers/pokemon.js";
import type from "./controllers/types.js";
import team from "./controllers/team.js";
import teamPokemon from "./controllers/teamPokemon.js";
const router = express.Router();

function pokemonRoute() {
  router.get("/api/v1/pokemon", pokemon.getAll);
  router.get("/api/v1/pokemon/:id", pokemon.getById);
}

function typeRoute() {
  router.get("/api/v1/type", type.getAll);
  router.get("/api/v1/type/:id", type.getById);
}

function teamRoute() {
  router.get("/api/v1/team", team.getAll);
  router.get("/api/v1/team/:id", team.getById);
  router.post("/api/v1/team", team.add);
  router.patch("/api/v1/team/:id", team.mod);
  router.delete("/api/v1/team/:id", team.del);
}
function teamPokemons() {
  router.post("/api/v1/teamPoke", teamPokemon.post);
  router.delete("/api/v1/teamPoke", teamPokemon.del);
}

teamPokemons();
teamRoute();
typeRoute();
pokemonRoute();

export default router;
