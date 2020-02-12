const { Parties } = require('../db/models');
const faker = require('faker');

//creating our fake parties

const createParties = async (num) => {
  try {
    for (let i = 0; i < num; i++) {
      let newParty = await Parties.create({
        name: faker.company.companyName(),
        email: faker.internet.email()
      });
      console.log(`created ${newParty.name}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// creates fake bids
const createBids = async (num, deal, partyId) => {
  for (let i = 0; i < num; i++) {
    try {
      await deal.createBid({
        amount: faker.finance.amount(),
        status: 'open',
        partyId: partyId
      });
    } catch (error) {
      console.error(error);
    }
  }
};

//creates fake deals
const createDeals = async (num) => {
  try {
    for (let i = 0; i < num; i++) {
      const partyId = Math.ceil(Math.random() * num);
      const curretParty = await Parties.findByPk(partyId);
      const deal = await curretParty.createDeal({
        asset: faker.internet.domainName(),
        status: 'open'
      });

      //creates between 1 - 10 new bids per deal using random partyId
      const party = Math.ceil(Math.random() * num);

      /* prevents creating deal owners bidding on their own deals.
      This will probably keep some deals from having bids,
      but this simulates deals with no prospective buyers.
      Deals with no bids will have top bid amount of Null returned*/

      if (party !== deal.partyId) {
        await createBids(Math.ceil(Math.random() * 10), deal, party);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const seed = async (num) => {
  await createParties(num);
  await createDeals(num);
};

module.exports = seed;
