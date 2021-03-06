
var args = process.argv.slice(2);

if (args.length >= 1)
    if (args[0] == 'dev')
        module.exports = {
            env: 'development',
            secret: 'Shhh eh segredo',
            admEmail: process.env.ADMIN_EMAIL,
            admPwd: process.env.ADMIN_PASSWORD,
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
            admEmail: process.env.ADMIN_EMAIL,
            admPwd: process.env.ADMIN_PASSWORD,
            nomeApi: 'appoio-backend',
            apiURL: process.env.API_URL,
            apiPort: 3000,
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            dataConfig: {
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                dialect: 'mysql',
                ssl: 'Amazon RDS',
                pool: { maxConnections: 1, maxIdleTime: 30 },
                language: 'en',
            }
        };

else
    throw 'Ambiente não informado: dev/prod';
