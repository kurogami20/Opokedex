import { Team_pokemon } from "../models/index.js";
import z from "zod";

const teamPokemon = {
  async post(req, res) {
    const data = req.body;
    const modSchema = z.object({
      pokemon_id: z.number().min(1),
      team_id: z.number().min(1),
    });
    const verif = modSchema.parse(data);

    console.log(verif);
    await Team_pokemon.create(verif);
  },
  async del(req, res) {
    const data = req.body;
    await Team_pokemon.destroy({ where: data });
  },
};
export default teamPokemon;
