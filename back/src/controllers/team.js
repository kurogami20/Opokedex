import { Team } from "../models/index.js";
import z from "zod";

const team = {
  async getAll(req, res) {
    const team = await Team.findAll({
      include: [{ association: "pokemon" }],
    });
    res.json(team);
  },
  async getById(req, res) {
    const id = req.params.id;
    const team = await Team.findByPk(id, {
      include: [{ association: "pokemon" }],
    });
    res.json(team);
  },
  async add(req, res) {
    const addSchema = z.object({
      name: z.string().nonempty(),
      description: z.string().optional(),
    });
    const data = req.body;

    const verif = addSchema.parse(data);

    await Team.create(verif);
  },
};
export default team;
