import dayjs from "dayjs";
import { db } from "../database/database.config.js";

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;

  if (!title || title.trim() === "") {
    return res.status(422).send("Title is required!");
  }

  const expireDate = expireAt
    ? dayjs(expireAt).format("YYYY-MM-DD HH:mm")
    : dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");

  try {
    const poll = { title, expireAt: expireDate };
    await db.collection("poll").insertOne(poll);
    res.status(201).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPoll(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getChoicePoll(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getResultPoll(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
