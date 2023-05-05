import { Router } from "express";
import { createChoices, createVotes } from "../controllers/choice.controllers.js";
import { validateChoiceFields } from "../middlewares/choice.middlewares.js"

const choiceRouter = Router();

choiceRouter.post("/choice", validateChoiceFields, createChoices);
choiceRouter.post("/choice/:id/vote", createVotes);

export default choiceRouter;
