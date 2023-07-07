const pg = require("pg");

pg.types.setTypeParser(20, Number);

const databaseName = process.env.DATABASE_NAME;
const userName = process.env.USER;

const knexConfigMyShop = {
  client: "postgresql",
  connection: {
    database: "my_shop",
    user: "tnluser",
    password: null,
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 2000, // free resources are destroyed after this many milliseconds
    reapIntervalMillis: 1000, // how frequent to check for idle resources to destroy
  },
};

const knex = require("knex");
const knexMyShop = knex(knexConfigMyShop);
//   console.log(typeof(knex()))
module.exports = { knexMyShop };
