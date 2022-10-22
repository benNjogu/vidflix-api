const db = require("./db");

//Testing numbers
module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

//Testing strings
module.exports.greet = function (name) {
  return "Welcome " + name + "!";
};

//Testing arrays
module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

//Testing objects
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

//Testing exceptions
module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required!");

  return { id: new Date().getTime(), username: username };
};

//fizzbuzz
module.exports.fizzbuzz = function (input) {
  if (typeof input !== "number") throw new Error("Input should be a number");

  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";

  if (input % 3 === 0) return "Fizz";

  if (input % 5 === 0) return "Buzz";

  return input;
};

//mock functions
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);

  if (customer.points > 10) order.totalPrice *= 0.9;
};
