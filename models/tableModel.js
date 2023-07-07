const { knexMyShop: db } = require("../libraries/psql");
const constants = require("./../utils/constants");

const initializeUserTable = async () => {
  return db.schema.hasTable("users").then(function (exists) {
    // console.log(exists);
    if (!exists) {
      return db.schema.createTable("users", function (table) {
        // table.string("id");
        table.string("mobile", 20).primary();
        table.string("name", 40);
        table
          .enu("designation", constants.userDesignations)
          .defaultTo("viewer")
          .notNullable();
        table.string("otp");
      }).raw(`
                    ALTER TABLE "users"
                    ADD CONSTRAINT check_mobile CHECK (mobile ~ '${constants.regexForMobile}')
                  `);
    }
  });
};

exports.initializeAllTables = async () => {
  await initializeUserTable();
};
