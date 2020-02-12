const db = require('../db');
const Sequelize = require('sequelize');

const Bids = db.define('bids', {
  amount: {
    type: Sequelize.REAL, //FLOAT for SQLight
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: Sequelize.TEXT
  }
});

// this hook simulates a enum field for sqlite3
Bids.beforeSave((bid) => {
  const enums = ['open', 'accepted', 'rejected'];
  if (enums.indexOf(bid.status) === -1) {
    throw new Error('data type not valid');
  }
});

/* using a hook to see if any  bid is the highest for that deal and updating the topBid on the deal if two bids of the same amount are top, the first submitted will be the top bid*/
Bids.afterSave(async (bid) => {
  const deal = await bid.getDeal();
  if (bid.amount > deal.topBid) {
    await deal.update({
      topBid: bid.amount,
      topBidId: bid.id
    });
  }
});

module.exports = Bids;
