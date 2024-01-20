const request = require("supertest");
const User = require("../../models/userModel");
const Genre = require("../../models/genreModel");
let server;

describe("/api/genres", () => {
  //called before each test in /api/genres
  beforeEach(() => {
    //need to load server before each test
    server = require("../../index");
  });

  //called after each test in /api/genres
  afterEach(async () => {
    //need to close server after each test otherwise we get port already in use issue
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should returns all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((genre) => genre.name === "genre1")).toBeTruthy();
      expect(res.body.some((genre) => genre.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then in each test,
    // we change one parameter that clearly aligns with the name of the test

    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("api/genres")
        .set("x-auth-token", token)
        .send({ name }); // ES6 style
    };

    beforeEach(() => {
      //before running each test, set values for happy path
      // i.e. set valid token and valid genre name
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = ""; // explicitly override token value

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is greater than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
