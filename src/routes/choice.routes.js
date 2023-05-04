import { Router } from "express";
import { createChoices, createVotes } from "../controllers/choice.controllers.js";

const choiceRouter = Router();

choiceRouter.post("/choice", createChoices);
choiceRouter.post("/choice/:id/vote", createVotes);

export default choiceRouter;
