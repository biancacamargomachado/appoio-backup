development = {
    env: "development",
    apiURL: "http://localhost",
    apiPort: 8080,
    dataConfig: {
        dialect: "sqlite",
        storage: "./database.sqlite3"
    }
}

production = {
    nomeApi: "appoio-backend",
}


module.exports = development;