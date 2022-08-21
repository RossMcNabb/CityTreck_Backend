const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../db");
const app = require("../index");

describe("read pathway", () => {
  let db = getDb();
  let pathways;

  beforeEach(async () => {
    [pathways] = await db.query("SELECT * from eating_and_drinking");
  });

  afterEach(async () => {
    await db.end();
  });

  describe("/pathway", () => {
    describe("GET", () => {
      it("returns pathway records in the database", async () => {
        const res = await request(app)
          .get("/pathway")
          .query({ city: "Birmingham", mobility: "low", restaurantType: "Bar" })
          .send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);

        res.body.forEach((pathwayRecord) => {
          const expected = pathways.find((a) => a.id === pathwayRecord.id);

          expect(pathwayRecord).to.deep.equal(expected);
        });
      });
    });
  });
});
