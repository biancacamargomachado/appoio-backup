const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bodyParser = require('body-parser');
const router = require('../routes');

require('../database');

let config = require('./env');

const app = express();
app.use(session({ store: new SQLiteStore, secret: config.secret, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', router);

module.exports = app;
