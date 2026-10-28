import { Router } from "express";
import submissionsRouter from "../modules/submissions/submissions.router.js";
import teamsRouter from "../modules/teams/teams.router.js";
import matchesRouter from "../modules/matches/matches.router.js";

const routerIndex = Router();

routerIndex.get("/test", (req, res) => {
    res.status(200).send({
        message: "Hola desde el router"
    });
});

routerIndex.use("/submissions", submissionsRouter);
routerIndex.use("/teams", teamsRouter);
routerIndex.use("/matches", matchesRouter);

export default routerIndex;
