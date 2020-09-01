development = {
  env: 'development',
  apiURL: 'http://localhost',
  apiPort: 8080,

  sqlite: {
    dataConfig: {
      dialect: 'sqlite',
      storage: './database.sqlite3',
    },
  },
  mysql: {
    dialect: 'mysql',
    host: 'db-appoio.cpr4q5lamt9g.sa-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: '12345678',
    database: 'db-appoio',

    define: {
      timestamp: true,
      underscored: true,
    },
  },
};

production = {
  nomeApi: 'appoio-backend',
};

module.exports = development;
