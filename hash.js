const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("1234", salt);
  console.log(hashed); //-> $2b$10$gAUhtmLzpNekcQE/bxWNQeaX4EVUOK1l1zPuvNysqnpAitu5nO7SW
}

run();
