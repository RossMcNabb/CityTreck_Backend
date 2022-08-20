const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../src/services/db");
const app = require("../src/app");

describe("update city", () => {
  let db;
  let city;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query("INSERT INTO city (name) VALUES(?)", ["Glasgow"]),
      db.query("INSERT INTO city (name) VALUES(?)", ["Liverpool"]),
      db.query("INSERT INTO city (name) VALUES(?)", ["London"]),
    ]);

    [city] = await db.query("SELECT * FROM city");
  });

  afterEach(async () => {
    await db.query("DELETE FROM city");
    await db.close();
  });

  describe("/city/:cityId", () => {
    describe("PATCH", () => {
      it("updates a single city with the correct id", async () => {
        const city = city[0];
        const res = await request(app)
          .patch(`/city/${city.id}`)
          .send({ name: "new city" });

        expect(res.status).to.equal(200);

        const [[newCityRecord]] = await db.query(
          "SELECT * FROM city WHERE id = ?",
          [city.id]
        );

        expect(newCityRecord.name).to.equal("new city");
      });

      it("returns a 404 if the city is not in the database", async () => {
        const res = await request(app)
          .patch("/city/999999")
          .send({ name: "new city" });

        expect(res.status).to.equal(404);
      });
    });
  });
});
