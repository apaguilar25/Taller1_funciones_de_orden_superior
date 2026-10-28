import matchesService from "./matches.service.js";

export const matchesController = {
  getAllMatches: async (req, res) => {
    try {
      const matches = await matchesService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las partidas",
        error: error.message,
      });
    }
  },
};

export default matchesController;
