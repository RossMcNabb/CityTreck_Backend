const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../src/services/db");
const app = require("../src/app");

describe("delete city", () => {
  let db;
  let city;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query("INSERT INTO city (name) VALUES(?)", ["Manchester"]),
      db.query("INSERT INTO city (name) VALUES(?)", ["London"]),
      db.query("INSERT INTO city (name) VALUES(?)", ["Birmingham"]),
    ]);

    [city] = await db.query("SELECT * from city");
  });

  afterEach(async () => {
    await db.query("DELETE FROM city");
    await db.close();
  });

  describe("/city/:cityId", () => {
    describe("DELETE", () => {
      it("deletes a single city with the correct id", async () => {
        const city = city[0];
        const res = await request(app).delete(`/city/${city.id}`).send();

        expect(res.status).to.equal(200);

        const [[deletedCityRecord]] = await db.query(
          "SELECT * FROM city WHERE id = ?",
          [city.id]
        );

        expect(!!deletedCityRecord).to.be.false;
      });

      it("returns a 404 if the city is not in the database", async () => {
        const res = await request(app).delete("/city/999999").send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
