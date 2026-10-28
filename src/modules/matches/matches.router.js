import { Router } from "express";
import matchesController from "./matches.controller.js";

// definimos GET /api/matches
const matchesRouter = Router();

matchesRouter.get("/", matchesController.getAllMatches);

export default matchesRouter;
