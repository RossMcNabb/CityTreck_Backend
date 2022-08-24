const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../db");
const app = require("../index");

describe("read pathway", () => {
  let db;
  let pathways;

  beforeEach(async () => {
    db = getDb();
    [eatingDrinkingPathways] = await db.query(
      "SELECT * from eating_and_drinking"
    );
    [attractionPathways] = await db.query("SELECT * from attractions");
  });

  afterEach(async () => {
    await db.end();
  });

  describe("/pathway", () => {
    describe("GET", () => {
      it("returns pathway records for eating and drinking", async () => {
        const res = await request(app)
          .get("/pathway")
          .query({
            city: "Liverpool",
            mobility: "Minimum",
            restaurantType: "Restaurant",
            cuisine: "middleEastern",
          })
          .send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);

        res.body.forEach((pathwayRecord) => {
          const expected = eatingDrinkingPathways.find(
            (a) => a.id === pathwayRecord.id
          );

          expect(pathwayRecord).to.deep.equal(expected);
        });
      });

      it("returns pathway records for attractions", async () => {
        const res = await request(app)
          .get("/pathway")
          .query({
            city: "Liverpool",
            mobility: "Minimum",
            attractionType: "landmarksMonuments",
          })
          .send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);

        res.body.forEach((pathwayRecord) => {
          const expected = attractionPathways.find(
            (a) => a.id === pathwayRecord.id
          );

          expect(pathwayRecord).to.deep.equal(expected);
        });
      });
    });
  });
});
