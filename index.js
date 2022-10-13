const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidflix")
  .then(() => console.log("Connected to the database..."))
  .catch((err) => console.error("Could not connect to the database...", err));

app.use(express.json());
app.use("/", home);
app.use("/vidflix.com/api/genres", genres);
app.use("/vidflix.com/api/customers", customers);
app.use("/vidflix.com/api/movies", movies);
app.use("/vidflix.com/api/rentals", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
