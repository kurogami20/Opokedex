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
  async mod(req, res) {
    const addSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    });
    const id = Number.parseInt(req.params.id);
    const data = req.body;

    const verif = addSchema.parse(data);

    await Team.update(verif, { where: { id: id } });
  },
  async del(req, res) {
    const id = Number.parseInt(req.params.id);

    await Team.destroy({ where: { id: id } });
  },
};
export default team;
