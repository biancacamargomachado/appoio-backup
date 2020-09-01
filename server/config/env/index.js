development = {
  env: 'development',
  apiURL: 'http://localhost',
  apiPort: 8080,

  dataConfig: {
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
};

production = {
  env: 'production',
  nomeApi: 'appoio-backend',
  apiURL: 'http://localhost/',
  apiPort: 8080,

  dataConfig: {
    database: 'production_db',
    username: 'admin',
    password: '12345678',
    host: 'db-appoio.cpr4q5lamt9g.sa-east-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql',

    dialectOptions: {
      ssl: 'Amazon RDS',
    },

    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: 'en',
  },
};

module.exports = production;
