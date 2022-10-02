const express = require("express");

const app = express();

const genres = [
  { id: 1, genre: "Comedy" },
  { id: 2, genre: "Thriller" },
  { id: 3, genre: "Action" },
];

app.get("/", (req, res) => {
  res.send("Hello world.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port " + port));
