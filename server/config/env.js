
var args = process.argv.slice(2);


if (args.length >= 1)
    if (args[0] == 'dev')
        module.exports = {
            env: 'development',
            secret: 'Shhh eh segredo',
            admEmail: 'admin@gmail.com',
            nomeApi: 'appoio-backend',
            apiURL: 'http://localhost',
            apiPort: 3000,
            dataConfig: {
                dialect: 'sqlite',
                dialectOptions: {
                    useUTC: false
                },
                storage: './database.sqlite3'
            }
        };
    else
        module.exports = {
            env: 'production',
            secret: process.env.SECRET,
            admEmail: 'adm@gmail.com',
            nomeApi: 'appoio-backend',
            apiURL: 'http://localhost',
            apiPort: 3000,
            database: '',
            username: '',
            password: '',
            dataConfig: {
                host: '',
                port: 3306,
                dialect: 'mysql',
                ssl: 'Amazon RDS',
                pool: { maxConnections: 1, maxIdleTime: 30 },
                language: 'en',
            }
        };

else
    throw 'Ambiente não informado: dev/prod';
