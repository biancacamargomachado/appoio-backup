const app = require('./server/config/express');
const config = require('./server/config/env');


app.get('/status', (req, res) => res.send({ status: 'Ok' }));

app.listen(config.apiPort, () => {
  console.log(
    `API Server started and listening on port ${config.apiPort} (${config.env})`
  );
});

module.exports = app;
