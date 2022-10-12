const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();

console.log(id.getTimestamp()); //->2022-10-12T11:46:01.000Z

const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid);//->false
