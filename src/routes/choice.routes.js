import { Router } from "express";
import { createChoices, createVotes } from "../controllers/choice.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { choiceSchema } from "../schemas/choice.schemas.js"

const choiceRouter = Router();

choiceRouter.post("/choice", validateSchema(choiceSchema), createChoices);
choiceRouter.post("/choice/:id/vote", createVotes);

export default choiceRouter;
