require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const app = express();

require("./startup/routes")(app);

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, error);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidflix",
  })
);

const p = Promise.reject(new Error("Something failed miserably."));
p.then(() => console.log("Done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidflix")
  .then(() => console.log("Connected to the database..."))
  .catch((err) => console.error("Could not connect to the database...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
