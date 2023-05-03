import joi from "joi";

export const voteSchema = joi.object({
  choiceId: joi.string().required(),
});
