import { Router } from "express";
import { createPolls, getPolls, getChoicePolls, getResultPolls } from "../controllers/poll.controllers.js";

const pollRouter = Router();

pollRouter.post("/poll", createPolls);
pollRouter.get("/poll", getPolls);
pollRouter.get("/poll/:id/choice", getChoicePolls);
pollRouter.get("/poll/:id/result", getResultPolls);

export default pollRouter;
