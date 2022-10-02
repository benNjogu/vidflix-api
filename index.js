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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
