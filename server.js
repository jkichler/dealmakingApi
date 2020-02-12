const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
module.exports = app;

const createApp = () => {
  app.use('/', (req, res, next) => {
    res.send(`App running on port ${PORT}`);
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  );
};

const bootApp = async () => {
  await createApp();
  await startListening();
};

bootApp();
