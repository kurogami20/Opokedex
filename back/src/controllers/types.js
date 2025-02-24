import { Type } from "../models/index.js";

const type = {
  async getAll(req, res) {
    const type = await Type.findAll();
    res.json(type);
  },
  async getById(req, res) {
    const id = req.params.id;
    const type = await Type.findByPk(id, {
      include: [{ association: "pokemon" }],
    });
    res.json(type);
  },
};
export default type;
