import { Pokemon } from "../models/index.js";

const pokemon = {
  async getAll(req, res) {
    const poke = await Pokemon.findAll();
    res.json(poke);
  },
  async getById(req, res) {
    const id = Number.parseInt(req.params.id);

    const poke = await Pokemon.findByPk(id, {
      include: [{ association: "type" }, { association: "team" }],
    });
    res.json(poke);
  },
};

export default pokemon;
