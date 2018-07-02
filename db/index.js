const pgp = require('pg-promise')();
// pgp.pg.defaults.poolSize = 20;

const connectionString = 'postrgres://localhost:5432/ymal';
const db = pgp(connectionString);

module.exports = db;
