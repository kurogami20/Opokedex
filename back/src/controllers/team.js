import { Team } from "../models/index.js";

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
};
export default team;
