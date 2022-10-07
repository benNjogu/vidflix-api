const home = require("./routes/home");
const genres = require("./routes/genres");
const express = require("express");

const app = express();
app.use(express.json());
app.use("/", home);
app.use("/vidflix.com/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
