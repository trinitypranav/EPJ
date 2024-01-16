const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Genre = require("../models/genreModel");

const genreSchema = Joi.object({
  name: Joi.string().required().min(3),
  movies: Joi.array(),
});

router.get("/", async (req, res) => {
  throw new Error("could not get genres");
  const result = await Genre.find().sort("name");
  res.status(200).send(result);
});
router.get("/:id", async (req, res) => {
  const document = await Genre.findById(req.params.id);
  res.status(200).send(document);
});

router.post("/", auth, async (req, res) => {
  const { error } = genreSchema.validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const newDocument = new Genre(req.body);
  const result = await newDocument.save();
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
