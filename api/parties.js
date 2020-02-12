const router = require('express').Router();
const { Parties } = require('../db/models');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const party = await Parties.findByPk(req.params.id);
    res.status(200).json(party);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const party = await Parties.findAll();
    res.status(200).json(party);
  } catch (error) {
    next(error);
  }
});
