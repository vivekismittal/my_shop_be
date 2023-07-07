const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const tableModel = require("./models/tableModel");
const userModel = require("./models/userModel");

dotenv.config({ path: "./config.env" });

const app = express();
userModel.selectUser("8989808901");
const routes = require("./routes");
tableModel.initializeAllTables().then(() => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api", routes);
  const port = process.env.PORT;
  app.listen(port, () => console.log(`server listening at port ${port}`));
});
