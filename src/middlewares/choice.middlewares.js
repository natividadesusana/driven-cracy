export function validateChoiceFields(req, res, next) {
  const { title, pollId } = req.body;

  if (!title || title.trim() === "" || !pollId) {
    return res.status(422).send("Title and pollId are required!");
  }

  next();
}