const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt); //-> $2b$10$NUYY2zSGLod3BJPRFl9/l.
}

run();
