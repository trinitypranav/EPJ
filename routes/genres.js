const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  {
    id: 1,
    genre: "horror",
    movies: ["US", "Get Out", "Psycho"],
  },
  {
    id: 2,
    genre: "action",
    movies: ["Thor", "End Game"],
  },
];

router.get("/", (req, res) => {
  res.send(genres);
});
router.get("/:id", (req, res) => {
  const name = genres.find((c) => c.id === parseInt(req.params.id));
  res.send(name);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const addGenre = {
    id: genres.length + 1,
    genre: req.body.genre,
    movies: req.body.movies,
  };

  genres.push(addGenre);
  res.send(addGenre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Invalid ID");
  }

  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  genre.genre = req.body.genre;
  genre.movies = req.body.movies;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Invalid ID");
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre) {
  const genreSchema = Joi.object({
    genre: Joi.string().required().min(3),
    movies: Joi.array().items(Joi.string()).length(2).required(),
  });

  return genreSchema.validate(genre);
}

module.exports = router;
