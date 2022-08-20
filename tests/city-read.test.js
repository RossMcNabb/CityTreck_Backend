const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../src/services/db");
const app = require("../src/app");

describe("read city", () => {
  let db;
  let city;

  [city] = db.query("SELECT * from city");
});

afterEach(async () => {
  await db.close();
});

describe("/city", () => {
  describe("GET", () => {
    it("returns all city records in the database", async () => {
      const res = await request(app).get("/city").send();

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);

      res.body.forEach((cityRecord) => {
        const expected = city.find((a) => a.id === cityRecord.id);

        expect(cityRecord).to.deep.equal(expected);
      });
    });
  });
});

describe("/city/:cityId", () => {
  describe("GET", () => {
    it("returns a single city with the correct id", async () => {
      const expected = cities[0];
      const res = await request(app).get(`/city/${expected.id}`).send();

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(expected);
    });

    it("returns a 404 if the city is not in the database", async () => {
      const res = await request(app).get("/city/999999").send();

      expect(res.status).to.equal(404);
    });
  });
});
