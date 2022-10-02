const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, genre: "Comedy" },
  { id: 2, genre: "Thriller" },
  { id: 3, genre: "Action" },
  { id: 4, genre: "Animation" },
];

app.get("/", (req, res) => {
  res.send("Hello world.");
});

app.get("/vidflix.com/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/vidflix.com/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre with that ID not found");

  res.send(genre);
});

app.post("/vidflix.com/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
