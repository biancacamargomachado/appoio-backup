const app = require('./server/config/express');
const config = require('./server/config/env');

app.listen(config.apiPort, () => {
  console.log(
    `API Server started and listening on port ${config.apiPort} (${config.env})`
  );
});

module.exports = app;
