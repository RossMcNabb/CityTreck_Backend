const { expect } = require("chai");
const request = require("supertest");
// const getDb = require("../src/services/db");
// const app = require("../src/app");

describe("read pathway", () => {
  let db;
  let pathway;

  [pathway] = db.query("SELECT * from ?");
});

afterEach(async () => {
  await db.close();
});

describe("/pathway", () => {
  describe("GET", () => {
    it("returns all pathway records in the database", async () => {
      const res = await request(app).get("/pathway").send();

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);

      res.body.forEach((pathwayRecord) => {
        const expected = pathway.find((a) => a.id === pathwayRecord.id);

        expect(pathwayRecord).to.deep.equal(expected);
      });
    });
  });
});

describe("/pathway/:pathwayId", () => {
  describe("GET", () => {
    it("returns a single pathway with the correct id", async () => {
      const expected = attraction[0];
      const res = await request(app).get(`/attraction/${expected.id}`).send();

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(expected);
    });

    it("returns a 404 if the attraction is not in the database", async () => {
      const res = await request(app).get("/attraction/999999").send();

      expect(res.status).to.equal(404);
    });
  });
});
