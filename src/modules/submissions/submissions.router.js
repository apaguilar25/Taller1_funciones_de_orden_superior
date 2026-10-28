import { Router } from "express";
import submissionsController from "./submissions.controller.js";

const submissionsRouter = Router();

submissionsRouter.get("/", submissionsController.getAllSubmissions);

export default submissionsRouter;
