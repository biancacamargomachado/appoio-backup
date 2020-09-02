
var args = process.argv.slice(2);


if (args.length >= 1)
    if (args[0] == 'dev')
        module.exports = {
            env: 'development',
            nomeApi: 'appoio-backend',
            apiURL: 'http://localhost',
            apiPort: 8080,
            dataConfig: {
                dialect: 'sqlite',
                storage: './database.sqlite3'
            }
        };
    else
        module.exports = {
            env: 'production',
            nomeApi: 'appoio-backend',
            apiURL: 'http://localhost',
            apiPort: 8080,
            dataConfig: {
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
        };

else
    throw 'Ambiente não informado: dev/prod';
