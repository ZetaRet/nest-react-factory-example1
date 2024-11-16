const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.join(__dirname + '/.env'),
});

const config = {
  client: process.env.DB_TYPE,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASS,
    database: process.env.SCHEMA,
  },
};
console.log('\x1b[31m Knex Config:\x1b[0m', config);
module.exports = config;
