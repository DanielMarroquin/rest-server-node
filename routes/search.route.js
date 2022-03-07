const { Router } = require ('express');
const { searchElement } = require('../controllers/search.controller');

const router = Router();

router.get('/:collection/:match', searchElement)

module.exports = router;