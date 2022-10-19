const ground = require("../testPlayground");

test("absolute - should return a positive number if the input is positive", () => {
  const result = ground.absolute(1);
  expect(result).toBe(1);
});

test("absolute - should return a positive number even if the input is negative", () => {
  const result = ground.absolute(-1);
  expect(result).toBe(1);
});

test("absolute - should return a zero if the input is null or zero", () => {
  const result = ground.absolute(0);
  expect(result).toBe(0);
});
