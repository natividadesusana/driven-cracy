import { Router } from "express";
import { createChoice, createVote } from "../controllers/choice.controllers.js";

const choiceRouter = Router();

choiceRouter.post("/choice", createChoice);
choiceRouter.post("/choice/:id/vote", createVote);

export default choiceRouter;
