const express = require("express");
const home = require("../routes/home");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/vidflix/api/genres", genres);
  app.use("/vidflix/api/customers", customers);
  app.use("/vidflix/api/movies", movies);
  app.use("/vidflix/api/rentals", rentals);
  app.use("/vidflix/api/users", users);
  app.use("/vidflix/api/auth", auth);
  app.use(error);
};
