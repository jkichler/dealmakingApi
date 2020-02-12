const router = require('express').Router();
const { Bids, Deals } = require('../db/models');
module.exports = router;

//get route for a single bid
router.get('/:id', async (req, res, next) => {
  try {
    const bid = await Bids.findByPk(req.params.id);
    res.send(bid);
  } catch (error) {
    next(error);
  }
});

//updates a single bid
router.put('/:id', async (req, res, next) => {
  try {
    //checking for required input data
    if (req.body.partyId && req.body.amount) {
      const bid = await Bids.findByPk(req.params.id);
      //reject if bid is not updated by bid owner
      if (Number(req.body.partyId) !== bid.partyId) {
        throw new Error('not authorized');
      }
      // reject bid update if deal is already closed
      const deal = await bid.getDeal();
      if (deal.status === 'closed') {
        throw new Error('deal closed');
      }
      // updates the bid
      const updatedBid = await bid.update({
        amount: Number(req.body.amount),
        status: req.body.status
      });
      res.send(updatedBid);
    } else {
      throw new Error(
        'incomplete bid data.  Amount, status and partyId are required'
      );
    }
  } catch (error) {
    next(error);
  }
});

//creates a new bid
router.post('/', async (req, res, next) => {
  try {
    if (req.body.dealId && req.body.amount && req.body.partyId) {
      const deal = await Deals.findByPk(req.body.dealId);
      // reject bid update if deal is closed
      if (deal.status === 'closed') {
        throw new Error('deal is closed');
      }
      const bid = await deal.createBid({
        amount: Number(req.body.amount),
        status: 'open',
        partyId: Number(req.body.partyId)
      });
      res.send(bid);
    } else {
      throw new Error('incomplete bid data. DealId and ammount are required');
    }
  } catch (error) {
    next(error);
  }
});

//gets a list of all bids
router.get('/', async (req, res, next) => {
  try {
    const bids = await Bids.findAll();
    res.status(200).json(bids);
  } catch (error) {
    next(error);
  }
});
