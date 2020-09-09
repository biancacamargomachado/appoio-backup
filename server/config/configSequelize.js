var args = process.argv.slice(2);

const config = {
    database: args[1],
    username: args[2],
    password: args[3],
    host: args[4],
    port: args[5],
    dialect: 'mysql',
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
    pool: { maxConnections: 10, maxIdleTime: 30 },
    language: 'en',            
}

module.exports = config;