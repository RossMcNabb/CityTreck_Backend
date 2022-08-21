// const { expect } = require("chai");
// const request = require("supertest");
// // const getDb = require("../src/services/db");
// // const app = require("../src/app");

// describe("read attraction", () => {
//   let db;
//   let attraction;
  
//   [attraction] = db.query("SELECT * from attraction");
// });

// afterEach(async () => {
//   await db.close();
// });

// describe("/attraction", () => {
//   describe("GET", () => {
//     it("returns all attraction records in the database", async () => {
//       const res = await request(app).get("/attraction").send();

//       expect(res.status).to.equal(200);
//       expect(res.body.length).to.equal(3);

//       res.body.forEach((attractionRecord) => {
//         const expected = attraction.find((a) => a.id === attractionRecord.id);

//         expect(attractionRecord).to.deep.equal(expected);
//       });
//     });
//   });
// });

// describe("/attraction/:attractionId", () => {
//   describe("GET", () => {
//     it("returns a single attraction with the correct id", async () => {
//       const expected = cities[0];
//       const res = await request(app).get(`/attraction/${expected.id}`).send();

//       expect(res.status).to.equal(200);
//       expect(res.body).to.deep.equal(expected);
//     });

//     it("returns a 404 if the attraction is not in the database", async () => {
//       const res = await request(app).get("/attraction/999999").send();

//       expect(res.status).to.equal(404);
//     });
//   });
// });
