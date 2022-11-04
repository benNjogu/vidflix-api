const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

let server;

describe("/vidflix/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
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
      // expect(res.body.length).toBe(2);
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

    it("should return a 404 error if no genre with given id exists", async () => {
      /*const genre = new Genre({ name: "genre1" });
      await genre.save();*/
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/vidflix/api/genres/" + id);

      expect(res.status).toBe(404);
      //expect(res.body).toHaveProperty("name", genre.name);
    });
  });

  describe("POST /", () => {
    let token, name;

    const exec = async () => {
      return await request(server)
        .post("/vidflix/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return a 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return a 400 if genre is less than 3 characters", async () => {
      name = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return a 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if its valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if its valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
