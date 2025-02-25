import { Team_pokemon } from "../models/index.js";
import z from "zod";

async function teamPokemon(req, res) {
  const data = req.body;
  const modSchema = z.object({
    pokemon_id: z.number().min(1),
    team_id: z.number().min(1),
  });
  const verif = modSchema.parse(data);

  console.log(verif);
  await Team_pokemon.create(verif);
}
export default teamPokemon;
