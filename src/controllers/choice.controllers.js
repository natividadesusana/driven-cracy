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
  const { id } = req.params;
  const now = dayjs();

  try {
    const choice = await db.collection("choices").findOne({ _id: new ObjectId(id) });

    if (!choice) {
      return res.status(404).send("Choice not found!");
    }

    const poll = await db.collection("polls").findOne({ _id: new ObjectId(choice.pollId) });
 
    if (!poll) {
      return res.status(404).send("Poll not found!");
    }

    const expired = now.isAfter(dayjs(poll.expireAt));
    
    if (expired) {
      return res.status(403).send("Poll is expired!");
    }

    const vote = {
      createdAt: now.format("YYYY-MM-DD HH:mm"),
      choiceId: id,   
    };
 
    await db.collection("votes").insertOne(vote);
    
    res.status(201).send("Vote created successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
