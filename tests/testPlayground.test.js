const ground = require("../testPlayground");
const db = require("../db");

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

describe("fizzbuzz", () => {
  it("should throw if input is not a number", () => {
    expect(() => {
      ground.fizzbuzz(null);
    }).toThrow();
    expect(() => {
      ground.fizzbuzz(undefined);
    }).toThrow();
    expect(() => {
      ground.fizzbuzz({});
    }).toThrow();
    expect(() => {
      ground.fizzbuzz("two");
    }).toThrow();
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = ground.fizzbuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if input is divisible by 3", () => {
    const result = ground.fizzbuzz(3);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if input is divisible by 5", () => {
    const result = ground.fizzbuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return input if input is not divisible by 3 or 5", () => {
    const result = ground.fizzbuzz(1);
    expect(result).toBe(1);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    const mockFunction = jest.fn();
    //mockFunction.mockReturnValue(1);
    mockFunction.mockResolvedValue(1);
    mockFunction.mockRejectedValue(new Error("..."));
    const result = await mockFunction();

    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 11 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    ground.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
