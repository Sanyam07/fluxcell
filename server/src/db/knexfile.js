require('dotenv').config({ path: '../../.env' });

const host = process.env.PGHOST;
const user = process.env.PGUSER;
const database = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;

// Check docker-compose file how the database host is exposed outside
// (server-postgres)

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: host || 'postgres',
      user: user || 'flux',
      password,
      database: database || 'fluxcraft',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: host || 'postgres',
      user: user || 'flux',
      password,
      database: database || 'fluxcraft',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
