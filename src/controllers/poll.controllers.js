import dayjs from "dayjs";
import { db } from "../database/database.config.js";

export async function createPolls(req, res) {
  const { title, expireAt } = req.body;

  if (!title || title.trim() === "") {
    return res.status(422).send("Title is required!");
  }

  const expireDate = expireAt
    ? dayjs(expireAt).format("YYYY-MM-DD HH:mm")
    : dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");

  try {
    const poll = { title, expireAt: expireDate };
    await db.collection("polls").insertOne(poll);
    res.status(201).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPolls(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.send(polls);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getChoicePolls(req, res) {
  const { id } = req.params;

  try {
    const choices = await db.collection("choices").find({ pollId: id }).toArray();

    if (choices.length === 0) {
      return res.status(404).send("Poll not found!");
    }

    res.send(choices);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


export async function getResultPolls(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
