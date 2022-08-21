const { expect } = require("chai");
const request = require("supertest");
// const getDb = require("../src/services/db");
// const app = require("../src/app");

describe("delete attraction", () => {
  let db;
  let attraction;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query("INSERT INTO attraction (name) VALUES(?)", [""]),
      db.query("INSERT INTO attraction (name) VALUES(?)", [""]),
      db.query("INSERT INTO attraction (name) VALUES(?)", [""]),
    ]);

    [attraction] = await db.query("SELECT * from attraction");
  });

  afterEach(async () => {
    await db.query("DELETE FROM attraction");
    await db.close();
  });

  describe("/attraction/:attractionId", () => {
    describe("DELETE", () => {
      it("deletes a single attraction with the correct id", async () => {
        const attraction = attraction[0];
        const res = await request(app).delete(`/city/${attraction.id}`).send();

        expect(res.status).to.equal(200);

        const [[deletedAttractionRecord]] = await db.query(
          "SELECT * FROM city WHERE id = ?",
          [attraction.id]
        );

        expect(!!deletedAttractionRecord).to.be.false;
      });

      it("returns a 404 if the attraction is not in the database", async () => {
        const res = await request(app).delete("/city/999999").send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
