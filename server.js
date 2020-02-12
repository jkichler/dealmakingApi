const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./db');
const seed = require('./scripts/seed');
const PORT = process.env.PORT || 3000;
const app = express();
module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  //api routes
  app.use('/api/bids', require('./api/bids'));
  app.use('/api/deals', require('./api/deals'));
  app.use('/api/parties', require('./api/parties'));

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

const syncDb = () => db.sync({ force: true });

const bootApp = async () => {
  await syncDb();
  await seed(10);
  await createApp();
  await startListening();
};

bootApp();
