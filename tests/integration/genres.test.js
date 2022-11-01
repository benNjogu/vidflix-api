const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

let server;

describe("/vidflix/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close;
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/vidflix/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1"));
      expect(res.body.some((g) => g.name === "genre2"));
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/vidflix/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return a 404 error if invalid id is passed", async () => {
      /*const genre = new Genre({ name: "genre1" });
      await genre.save();*/

      const res = await request(server).get("/vidflix/api/genres/1");

      expect(res.status).toBe(404);
      //expect(res.body).toHaveProperty("name", genre.name);
    });
  });

  describe("POST /", () => {
    it("should return a 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/vidflix/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return a 400 if genre is less than 3 characters", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/vidflix/api/genres")
        .set("x-auth-token", token)
        .send({ name: "12" });

      expect(res.status).toBe(400);
    });

    it("should return a 400 if genre is more than 50 characters", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");

      const res = await request(server)
        .post("/vidflix/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });
  });
});
