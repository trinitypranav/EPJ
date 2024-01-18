const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Genre = require("../models/genreModel");

const genreSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  movies: Joi.array(),
});

router.get("/", async (req, res) => {
  const result = await Genre.find().sort("name");
  res.status(200).send(result);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const document = await Genre.findById(req.params.id);
  if (!document)
    return res.status(404).send("The genre with the given Id does not exist");
  res.status(200).send(document);
});

router.post("/", auth, async (req, res) => {
  const { error } = genreSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genre(req.body);
  const result = await genre.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const updatedDocument = await Genre.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).send(updatedDocument);
});

// only admin can delete genre. Passing 2 middlewares - first auth and then admin
router.delete("/:id", [auth, admin], async (req, res) => {
  const deletedDocument = await Genre.findByIdAndDelete(req.params.id);
  res.status(200).send(deletedDocument);
});

module.exports = router;
