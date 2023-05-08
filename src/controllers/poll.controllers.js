import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { db } from "../database/database.config.js";

export async function createPolls(req, res) {
  const { title, expireAt } = req.body;

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
  const { id } = req.params;

  try {
    const poll = await db.collection("polls").findOne({ _id: new ObjectId(id) });

    if (!poll) {
      return res.status(404).send("Poll not found!");
    }
    const choices = await db.collection("choices").find({ pollId: id }).toArray();
    const choicesIds = choices.map(choice => choice._id.toString());

    const votes = await db.collection("votes").find({ choiceId: { $in: choicesIds }}).toArray();

    const voteCount = choices.map((choice) => {
      const count = votes.filter((vote) => vote.choiceId === choice._id.toString()).length;
      return { ...choice, count };
    });

    const mostVotedChoice = voteCount.reduce((max, choice) => {
      return choice.count > max.count ? choice : max;
    }, { count: 0 });

    const response = {
      _id: poll._id,
      title: poll.title,
      expireAt: poll.expireAt,
      result: {
        title: mostVotedChoice.title,
        votes: mostVotedChoice.count,
      },
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
