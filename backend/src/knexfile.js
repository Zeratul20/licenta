require('dotenv').config({ path: require('find-config')('.env') })
const { config } = require("./services/pg");
const knexConfig = {
  client: "postgresql",
  connection: config.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
    directory: `${__dirname}/migrations`,
  },
};
module.exports = knexConfig;
