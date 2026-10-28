import teamsService from "./teams.service.js";

export const teamsController = {
  getAllTeams: async (req, res) => {
    try {
      const teams = await teamsService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los equipos",
        error: error.message,
      });
    }
  },
};

export default teamsController;
