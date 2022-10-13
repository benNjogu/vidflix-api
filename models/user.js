const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
  })
);

function validateGenre(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateGenre;
