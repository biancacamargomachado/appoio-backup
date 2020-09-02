module.exports = {
  database: 'production_db',
  username: 'admin',
  password: '12345678',
  host: 'db-appoio.cpr4q5lamt9g.sa-east-1.rds.amazonaws.com',
  port: 3306,
  dialect: 'mysql',

  define: {
    timestamp: true,
    undescored: true,
  },
};
