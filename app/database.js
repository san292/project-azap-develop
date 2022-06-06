const { Pool } = require('pg');

let pool = new Pool({
  connectionString: process.env.PG_URL
  // connectionString: 'postgres://sanman:san292@localhost:5432/azap'
});
console.log('process.env.pgurl', process.env.PG_URL);
console.log('process.env', process.env.PORT);
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    // connectionString: process.env.DATABASE_URL,

    // on ajoute cette option pour que heroku ne rejette pas les connexions non https à la DB
    ssl: {
      rejectUnauthorized: false
    }
  });
}

module.exports = pool;
