const db = require('../db');
const Sequelize = require('sequelize');

const Deals = db.define('deals', {
  asset: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.TEXT
  },
  topBid: {
    type: Sequelize.REAL //float for SQLite 3
  },
  topBidId: {
    type: Sequelize.INTEGER
  }
});

// this hook simulates a enum field for sqlite3
Deals.beforeSave((deal) => {
  const enums = ['open', 'closed', 'cancelled'];
  if (enums.indexOf(deal.status) === -1) {
    throw new Error('data type not valid');
  }
});

/* This hook checks for a closed status on an update.
   If the deal is closed, the topBid is accepted and all other bids are rejected */

Deals.afterUpdate(async (deal) => {
  if (deal.status === 'closed') {
    const bids = await deal.getBids();
    bids.forEach((bid) => {
      if (bid.id === deal.topBidId) {
        bid.update({ status: 'accepted' });
      } else {
        bid.update({ status: 'rejected' });
      }
    });
  }
});

module.exports = Deals;
