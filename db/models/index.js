//this file creates provides an index for importing of all models and creates  db associations

const Bids = require('./bids');
const Deals = require('./deals');
const Parties = require('./parties');

// db associations

// party is one to many relationship with deals.  This adds partyId to the Deal table
// this represents the owner of the deal
Parties.hasMany(Deals);
Deals.belongsTo(Parties);

// deal is one to many relationship with bids.  This adds dealId to the party table
// this represents the deal associated with the bid
Deals.hasMany(Bids);
Bids.belongsTo(Deals);

// Party is also a one to many relationship with bids.  This adds partyId to the Bid table
// this represents the owner of the bid
Parties.hasMany(Bids);
Bids.belongsTo(Parties);

module.exports = { Parties, Deals, Bids };
