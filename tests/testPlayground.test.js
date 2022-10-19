const ground = require("../testPlayground");

describe("absolute", () => {
  it("should return a positive number if the input is positive", () => {
    const result = ground.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number even if the input is negative", () => {
    const result = ground.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a zero if the input is null or zero", () => {
    const result = ground.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = ground.greet("Ben");
    expect(result).toBe("Welcome Ben");
  });
});
