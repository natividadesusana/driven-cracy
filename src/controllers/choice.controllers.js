import { db } from "../database/database.config.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function createChoices(req, res) {
  const { title, pollId } = req.body;

  try {
    const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });

    if (!poll) {
      return res.status(404).send("Poll not found!");
    }
    
    if (dayjs(poll.expireAt) < dayjs()) {
      return res.status(403).send("Poll has already expired!");
    }

    const choice = await db.collection("choices").findOne({ title });

    if (choice) {
      return res.status(409).send("Choice already exists!");
    }

    const newChoice = { title, pollId };
    await db.collection("choices").insertOne(newChoice);

    res.status(201).send(newChoice);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createVotes(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
