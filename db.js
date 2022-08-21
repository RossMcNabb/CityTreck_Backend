const db = require("mysql-promise")();

const { DB_PASSWORD, DB_USER, DB_NAME, DB_HOST, DB_PORT } = process.env;

module.exports = () => {
  db.configure({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
  });

  return db;
};
