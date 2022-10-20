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
    expect(result).toMatch(/Ben/);
    //alternatively,
    expect(result).toContain("Ben");
  });
});

describe("getCurrencies", () => {
  it("should return an array of surpotted currencies", () => {
    const result = ground.getCurrencies();

    //Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
