const request = require("supertest");

let server;

describe("/vidflix/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close;
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/vidflix/api/genres");
      expect(res.status).toBe(200);
    });
  });
});
