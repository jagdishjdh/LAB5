const express = require('express');
const router = express.Router();
const prods = require('../controllers/prods')

router.get('/', prods.get_prods);

module.exports = router;