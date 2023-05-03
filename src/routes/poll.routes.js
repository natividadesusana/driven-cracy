import { Router } from "express";
import { createPoll, getPoll, getChoicePoll, getResultPoll } from "../controllers/poll.controllers.js";

const pollRouter = Router();

pollRouter.post("/poll", createPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("/poll/:id/choice", getChoicePoll);
pollRouter.get("/poll/:id/result", getResultPoll);

export default pollRouter;
