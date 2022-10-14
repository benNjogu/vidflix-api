const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidflix")
    .then(() => winston.info("Connected to the database..."));
};