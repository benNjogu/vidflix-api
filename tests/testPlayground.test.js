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

describe("getProduct", () => {
  it("should return a product with a given id", () => {
    const result = ground.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});


describe("registerUser", () => {
  it("should throw if user name is falsy", () => {
    /**
     * falsy values in js
     * Null, undefined, NaN, 0, false, ''
     */
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => ground.registerUser(a)).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = ground.registerUser("Ben");
    expect(result).toMatchObject({ username: "Ben" });
    expect(result.id).toBeGreaterThan(0);
  });
});