import submissionsService from "./submissions.service.js";

// pide los datos al service, decide codigo, estado y responde 
export const submissionsController = {
  getAllSubmissions: async (req, res) => {
    try {
      const submissions = await submissionsService.getAllSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las entregas",
        error: error.message,
      });
    }
  },
};

export default submissionsController;
