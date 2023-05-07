import { Router } from "express";
import { createPolls, getPolls, getChoicePolls, getResultPolls } from "../controllers/poll.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { pollSchema } from "../schemas/poll.schemas.js";

const pollRouter = Router();

pollRouter.post("/poll", validateSchema(pollSchema), createPolls);
pollRouter.get("/poll", getPolls);
pollRouter.get("/poll/:id/choice", getChoicePolls);
pollRouter.get("/poll/:id/result", getResultPolls);

export default pollRouter;
