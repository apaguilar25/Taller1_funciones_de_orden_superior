import { Router } from "express";
import teamsController from "./teams.controller.js";

const teamsRouter = Router();

teamsRouter.get("/", teamsController.getAllTeams);

export default teamsRouter;
