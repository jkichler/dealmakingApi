const router = require('express').Router();
const { Deals, Parties } = require('../db/models');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const currentDeal = await Deals.findByPk(req.params.id);
    res.send(currentDeal);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const deal = await Deals.findByPk(req.params.id);
    //rejecting anyone but deal owner making a change
    if (Number(req.body.partyId) !== deal.partyId) {
      throw new Error('not authorized');
    }
    if (req.body.status) {
      const updatedDeal = await deal.update({
        status: req.body.status
      });
      res.send(updatedDeal);
    } else {
      throw new Error('incomplete please include status value');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.body.partyId && req.body.asset) {
      const party = await Parties.findByPk(req.body.partyId);
      const newDeal = await party.createDeal({
        asset: req.body.asset,
        status: 'open'
      });
      res.status(200).json(newDeal);
    } else {
      throw new Error(
        'incomplete deal data, please include partyId, and asset'
      );
    }
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const deals = await Deals.findAll();
    res.status(200).json(deals);
  } catch (error) {
    next(error);
  }
});
